import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import GET_LOCATION_BY_ID from 'graphql/queries/getLocationById.graphql';
import { LocationDetails } from './LocationDetails';

const locationMock = {
  request: {
    query: GET_LOCATION_BY_ID,
    variables: { id: '1' },
  },
  result: {
    data: {
      location: {
        id: '1',
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
        created: '2017-11-04T18:48:46.250Z',
        residents: [
          {
            id: '1',
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          },
          {
            id: '2',
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          },
        ],
      },
    },
  },
};

const errorMock = {
  request: {
    query: GET_LOCATION_BY_ID,
    variables: { id: '1' },
  },
  error: new Error('An error occurred'),
};

describe('LocationDetails Component', () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MantineProvider>{ui}</MantineProvider>
      </MockedProvider>
    );

  it('renders loading state initially', () => {
    renderWithProviders(<LocationDetails id="1" />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MantineProvider>
          <LocationDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText(/An error occurred/i)).toBeInTheDocument();
  });

  it('renders no data available state', async () => {
    const noDataMock = {
      ...locationMock,
      result: { data: { location: null } },
    };

    render(
      <MockedProvider mocks={[noDataMock]} addTypename={false}>
        <MantineProvider>
          <LocationDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText(/No data available/i)).toBeInTheDocument();
  });

  it('renders location details', async () => {
    render(
      <MockedProvider mocks={[locationMock]} addTypename={false}>
        <MantineProvider>
          <LocationDetails id="1" />
        </MantineProvider>
      </MockedProvider>
    );

    expect(await screen.findByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Type: Planet')).toBeInTheDocument();
    expect(screen.getByText('Dimension: Dimension C-137')).toBeInTheDocument();
    expect(screen.getByText('Created: 11/4/2017')).toBeInTheDocument();
    expect(screen.getByText('Residences')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
