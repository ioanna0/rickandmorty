import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Table, Button, Container, Title, Pagination, Group, TableData } from '@mantine/core';
import { useRouter } from 'next/router';
import { GET_EPISODES } from '@/utils/graphql-queries';
import CustomLoader from '../CustomLoader';

const Episodes = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_EPISODES, { variables: { page } });
  const router = useRouter();

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewClick = (id: string) => {
    router.push(`/episodes/${id}`);
  };

  const tableData: TableData = {
    caption: 'Episodes from Rick and Morty TV show',
    head: ['Name', 'Air Date', 'Episode', 'Actions'],
    body: data.episodes.results.map((episode: any) => [
      episode.name,
      episode.air_date,
      episode.episode,
      <Button variant="outline" onClick={() => handleViewClick(episode.id)}>
        View
      </Button>,
    ]),
  };

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
          total={data.episodes.info.pages}
          size="sm"
          withEdges
        />
      </Group>
    </Container>
  );
};

export default Episodes;
