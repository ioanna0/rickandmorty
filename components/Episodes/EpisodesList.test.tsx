import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import GET_EPISODES from 'graphql/queries/getEpisodes.graphql';
import Episodes from './EpisodesList';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const episodeMocks = [
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 1 },
    },
    result: {
      data: {
        episodes: {
          info: {
            count: 2,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            {
              id: '1',
              name: 'Pilot',
              air_date: 'December 2, 2013',
              episode: 'S01E01',
              characters: [
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
              name: 'Lawnmower Dog',
              air_date: 'December 9, 2013',
              episode: 'S01E02',
              characters: [
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

describe('Episodes component', () => {
  it('renders the loading state initially', () => {
    render(
      <MockedProvider mocks={episodeMocks} addTypename={false}>
        <MantineProvider>
          <Episodes />
        </MantineProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders episodes data correctly', async () => {
    render(
      <MockedProvider mocks={episodeMocks} addTypename={false}>
        <MantineProvider>
          <Episodes />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();
  });

  it('handles view button click correctly', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <MockedProvider mocks={episodeMocks} addTypename={false}>
        <MantineProvider>
          <Episodes />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    fireEvent.click(screen.getAllByText('View')[0]);

    expect(push).toHaveBeenCalledWith('/episodes/1');
  });

  it('renders the error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_EPISODES,
          variables: { page: 1 },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MantineProvider>
          <Episodes />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });
});
