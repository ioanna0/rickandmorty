import { useQuery } from '@apollo/client';
import { useState, useMemo, useCallback } from 'react';
import { Table, Button, Container, Title, Pagination, Group, TableData } from '@mantine/core';
import { useRouter } from 'next/router';
import GET_EPISODES from 'graphql/queries/getEpisodes.graphql';
import CustomLoader from '../CustomLoader';
import { GetEpisodesQuery, GetEpisodesQueryVariables } from '@/types/graphql';
import ErrorMessage from '../ErrorMessage';

const Episodes: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data } = useQuery<GetEpisodesQuery, GetEpisodesQueryVariables>(
    GET_EPISODES,
    { variables: { page } }
  );
  const router = useRouter();

  const handleViewClick = useCallback(
    (id: string | undefined | null) => {
      if (!id) return;
      router.push(`/episodes/${id}`);
    },
    [router]
  );

  const tableData: TableData = useMemo(
    () => ({
      caption: 'Episodes from Rick and Morty TV show',
      head: ['Name', 'Air Date', 'Episode', 'Actions'],
      body: data?.episodes?.results?.map((episode) => [
        episode?.name,
        episode?.air_date,
        episode?.episode,
        <Button variant="outline" onClick={() => handleViewClick(episode?.id)} key={episode?.id}>
          View
        </Button>,
      ]) as [string, string, string, JSX.Element][],
    }),
    [data, handleViewClick]
  );

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage error={error.message} />;

  return (
    <Container>
      <Title order={1} mb={40}>
        Episodes
      </Title>
      <Table highlightOnHover data={tableData} />
      <Group p="apart" mt="md">
        <Pagination
          value={page}
          onChange={setPage}
          total={data?.episodes?.info?.pages || 1}
          size="sm"
          withEdges
        />
      </Group>
    </Container>
  );
};

export default Episodes;
