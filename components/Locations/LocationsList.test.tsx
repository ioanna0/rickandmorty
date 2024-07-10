import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import GET_LOCATIONS from 'graphql/queries/getLocations.graphql';
import Locations from './LocationsList';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const locationMocks = [
  {
    request: {
      query: GET_LOCATIONS,
      variables: { page: 1 },
    },
    result: {
      data: {
        locations: {
          info: {
            count: 2,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            {
              id: '1',
              name: 'Earth (C-137)',
              type: 'Planet',
              dimension: 'Dimension C-137',
              residents: [
                {
                  id: '1',
                  name: 'Rick Sanchez',
                  status: 'Alive',
                  species: 'Human',
                  type: '',
                  gender: 'Male',
                  image: 'https://example.com/rick.png',
                },
              ],
              created: '2017-11-10T12:56:33.798Z',
            },
            {
              id: '2',
              name: 'Citadel of Ricks',
              type: 'Space station',
              dimension: 'Unknown',
              residents: [
                {
                  id: '2',
                  name: 'Morty Smith',
                  status: 'Alive',
                  species: 'Human',
                  type: '',
                  gender: 'Male',
                  image: 'https://example.com/morty.png',
                },
              ],
              created: '2017-11-10T12:56:33.798Z',
            },
          ],
        },
      },
    },
  },
];

describe('Locations component', () => {
  it('renders the loading state initially', () => {
    render(
      <MockedProvider mocks={locationMocks} addTypename={false}>
        <MantineProvider>
          <Locations />
        </MantineProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders locations data correctly', async () => {
    render(
      <MockedProvider mocks={locationMocks} addTypename={false}>
        <MantineProvider>
          <Locations />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
  });

  it('handles view button click correctly', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <MockedProvider mocks={locationMocks} addTypename={false}>
        <MantineProvider>
          <Locations />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    fireEvent.click(screen.getAllByText('View')[0]);

    expect(push).toHaveBeenCalledWith('/locations/1');
  });

  it('renders the error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_LOCATIONS,
          variables: { page: 1 },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MantineProvider>
          <Locations />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });
});
