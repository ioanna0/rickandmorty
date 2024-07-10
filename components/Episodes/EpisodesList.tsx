import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Table, Button, Loader, Container, Title, Pagination, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { GET_EPISODES } from '@/utils/graphql-queries';

const Episodes = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_EPISODES, { variables: { page } });
  const router = useRouter();

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewClick = (id: string) => {
    router.push(`/episodes/${id}`);
  };

  return (
    <Container>
      <Title order={1}>Episodes</Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Air Date</th>
            <th>Episode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.episodes.results.map((episode: any) => (
            <tr key={episode.id}>
              <td>{episode.name}</td>
              <td>{episode.air_date}</td>
              <td>{episode.episode}</td>
              <td>
                <Button variant="outline" onClick={() => handleViewClick(episode.id)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
