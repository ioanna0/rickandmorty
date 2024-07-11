import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import GET_CHARACTER_BY_ID from 'graphql/queries/getCharacterById.graphql';
import CharacterDetails from './CharacterDetails';

const characterMock = {
  request: {
    query: GET_CHARACTER_BY_ID,
    variables: { id: '1' },
  },
  result: {
    data: {
      character: {
        id: '1',
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth (C-137)', id: '1' },
        location: { name: 'Earth (Replacement Dimension)', id: '20' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          { id: '1', name: 'Pilot' },
          { id: '2', name: 'Lawnmower Dog' },
        ],
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_CHARACTER_BY_ID,
    variables: { id: '1' },
  },
  error: new Error('An error occurred'),
};

describe('CharacterDetails Component', () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MantineProvider>{ui}</MantineProvider>
      </MockedProvider>
    );

  it('renders loading state initially', () => {
    renderWithProviders(<CharacterDetails id="1" />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MantineProvider>
          <CharacterDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText(/An error occurred/i)).toBeInTheDocument();
  });

  it('renders no data available state', async () => {
    const noDataMock = {
      ...characterMock,
      result: { data: { character: null } },
    };

    render(
      <MockedProvider mocks={[noDataMock]} addTypename={false}>
        <MantineProvider>
          <CharacterDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
  });

  it('renders character details', async () => {
    render(
      <MockedProvider mocks={[characterMock]} addTypename={false}>
        <MantineProvider>
          <CharacterDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Species: Human')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Origin: Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Earth (Replacement Dimension)')).toBeInTheDocument();
    expect(screen.getByText('Episodes')).toBeInTheDocument();
    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
  });
});
