import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import GET_CHARACTERS from 'graphql/queries/getCharacters.graphql';
import Characters from './CharacterList';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          info: {
            count: 2,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            {
              id: '1',
              name: 'Rick Sanchez',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth',
                type: 'Planet',
                dimension: 'C-137',
              },
              location: {
                name: 'Earth',
                type: 'Planet',
                dimension: 'C-137',
              },
              image: 'https://example.com/rick.png',
              created: '2017-11-04T18:48:46.250Z',
              episode: [
                {
                  id: '1',
                  name: 'Pilot',
                  episode: 'S01E01',
                },
              ],
            },
            {
              id: '2',
              name: 'Morty Smith',
              status: 'Alive',
              species: 'Human',
              type: '',
              gender: 'Male',
              origin: {
                name: 'Earth',
                type: 'Planet',
                dimension: 'C-137',
              },
              location: {
                name: 'Earth',
                type: 'Planet',
                dimension: 'C-137',
              },
              image: 'https://example.com/morty.png',
              created: '2017-11-04T18:50:21.651Z',
              episode: [
                {
                  id: '1',
                  name: 'Pilot',
                  episode: 'S01E01',
                },
              ],
            },
          ],
        },
      },
    },
  },
];

describe('Characters component', () => {
  it('renders the loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MantineProvider>
          <Characters />
        </MantineProvider>
      </MockedProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders characters data correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MantineProvider>
          <Characters />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('handles view button click correctly', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MantineProvider>
          <Characters />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    fireEvent.click(screen.getAllByText('View')[0]);

    expect(push).toHaveBeenCalledWith('/characters/1');
  });

  it('renders the error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { page: 1 },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MantineProvider>
          <Characters />
        </MantineProvider>
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });
});
