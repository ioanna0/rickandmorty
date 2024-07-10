import React from 'react';
import { Card, Container, Text, Title } from '@mantine/core';
import { useQuery } from '@apollo/client';
import GET_EPISODE_BY_ID from 'graphql/queries/getEpisodeById.graphql';
import { useRouter } from 'next/router';
import CustomLoader from '@/components/CustomLoader';
import { GetEpisodeByIdQuery, GetEpisodeByIdQueryVariables } from '@/types/graphql';
import CharactersCard, { CardResident } from '@/components/Characters/CharactersCard';

const EpisodeDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<GetEpisodeByIdQuery, GetEpisodeByIdQueryVariables>(
    GET_EPISODE_BY_ID,
    {
      variables: { id: id as string },
    }
  );

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.episode) return <p>No data available</p>;

  const { episode } = data;

  return (
    <Container>
      <Card shadow="sm" padding="lg" mb="20px">
        <Title order={1}>{episode.name}</Title>
        <Text size="md" c="dimmed">
          Air Date: {episode.air_date}
        </Text>
        <Text size="md" c="dimmed">
          Episode: {episode.episode}
        </Text>
        {episode.created && (
          <Text size="sm" c="dimmed">
            Created: {new Date(episode.created).toLocaleDateString()}
          </Text>
        )}
      </Card>
      <CharactersCard residents={episode.characters as CardResident[]} title="Characters" />
    </Container>
  );
};

export default EpisodeDetails;
