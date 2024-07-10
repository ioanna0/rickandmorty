import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_EPISODE_BY_ID } from '@/utils/graphql-queries';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EpisodeDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_EPISODE_BY_ID, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { episode } = data;

  return (
    <div>
      <h1>{episode.name}</h1>
      <p>Air Date: {episode.air_date}</p>
      <p>Episode: {episode.episode}</p>
      <h2>Characters</h2>
      <ul>
        {episode.characters.map(
          (character: {
            id: React.Key | null | undefined;
            name:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
            species:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
            status:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
          }) => (
            <li key={character.id}>
              <Link href={`/characters/${character.id}`}>
                {character.name} - {character.species} ({character.status})
              </Link>
            </li>
          )
        )}
      </ul>
      <p>Created: {episode.created}</p>
    </div>
  );
};

export default EpisodeDetails;
