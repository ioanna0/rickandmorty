import React, { useMemo } from 'react';
import { Container, Card, Title, Text } from '@mantine/core';
import { useQuery } from '@apollo/client';
import GET_EPISODE_BY_ID from 'graphql/queries/getEpisodeById.graphql';
import { GetEpisodeByIdQuery, GetEpisodeByIdQueryVariables } from '@/types/graphql';
import CharactersCard, { CardResident } from '../Characters/CharactersCard';
import CustomLoader from '../CustomLoader';
import ErrorMessage from '../ErrorMessage';
import NoDataAvailable from '../NoDataAvailable';

interface EpisodeDetailsProps {
  id: string;
}

const EpisodeDetails = ({ id }: EpisodeDetailsProps) => {
  const { loading, error, data } = useQuery<GetEpisodeByIdQuery, GetEpisodeByIdQueryVariables>(
    GET_EPISODE_BY_ID,
    {
      variables: { id },
    }
  );

  const episodeData = useMemo(() => {
    if (data?.episode) {
      const { name, air_date, episode, created, characters } = data.episode;
      return {
        name,
        airDate: air_date,
        episodeCode: episode,
        created: created ? new Date(created).toLocaleDateString() : undefined,
        characters: characters as CardResident[],
      };
    }
    return null;
  }, [data]);

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage error={error.message} />;
  if (!episodeData) return <NoDataAvailable />;

  const { name, airDate, episodeCode, created, characters } = episodeData;

  return (
    <Container>
      <Card shadow="sm" padding="lg" mb="20px">
        <Title order={1}>{name}</Title>
        <Text size="md" c="dimmed">
          Air Date: {airDate}
        </Text>
        <Text size="md" c="dimmed">
          Episode: {episodeCode}
        </Text>
        {created && (
          <Text size="sm" c="dimmed">
            Created: {created}
          </Text>
        )}
      </Card>
      <CharactersCard residents={characters} title="Characters" />
    </Container>
  );
};

export default EpisodeDetails;
