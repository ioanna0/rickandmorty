import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import GET_EPISODE_BY_ID from 'graphql/queries/getEpisodeById.graphql';
import EpisodeDetails from './EpisodeDetails';

const episodeMock = {
  request: {
    query: GET_EPISODE_BY_ID,
    variables: { id: '1' },
  },
  result: {
    data: {
      episode: {
        id: '1',
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        created: '2017-11-04T18:48:46.250Z',
        characters: [
          {
            id: '1',
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            origin: { name: 'Earth (C-137)', id: '1' },
            location: { name: 'Earth (Replacement Dimension)', id: '20' },
            created: '2017-11-04T18:48:46.250Z',
          },
          {
            id: '2',
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            origin: { name: 'Earth (C-137)', id: '1' },
            location: { name: 'Earth (Replacement Dimension)', id: '20' },
            created: '2017-11-04T18:50:21.651Z',
          },
        ],
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_EPISODE_BY_ID,
    variables: { id: '1' },
  },
  error: new Error('An error occurred'),
};

describe('EpisodeDetails Component', () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MantineProvider>{ui}</MantineProvider>
      </MockedProvider>
    );

  it('renders loading state initially', () => {
    renderWithProviders(<EpisodeDetails id="1" />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MantineProvider>
          <EpisodeDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText(/An error occurred/i)).toBeInTheDocument();
  });

  it('renders no data available state', async () => {
    const noDataMock = {
      ...episodeMock,
      result: { data: { episode: null } },
    };

    render(
      <MockedProvider mocks={[noDataMock]} addTypename={false}>
        <MantineProvider>
          <EpisodeDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
  });

  it('renders episode details', async () => {
    render(
      <MockedProvider mocks={[episodeMock]} addTypename={false}>
        <MantineProvider>
          <EpisodeDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Air Date: December 2, 2013')).toBeInTheDocument();
    expect(screen.getByText('Episode: S01E01')).toBeInTheDocument();
    expect(screen.getByText('Created: 11/4/2017')).toBeInTheDocument();
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
