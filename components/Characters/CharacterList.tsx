import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Table, Button, Loader, Container, Title, Pagination, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { GET_CHARACTERS } from '@/utils/graphql-queries';

const Characters = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, { variables: { page } });
  const router = useRouter();

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewClick = (id: string) => {
    router.push(`/characters/${id}`);
  };

  return (
    <Container>
      <Title order={1}>Characters</Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Origin</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.characters.results.map((character: any) => (
            <tr key={character.id}>
              <td>{character.name}</td>
              <td>{character.species}</td>
              <td>{character.origin?.name}</td>
              <td>{character.location?.name}</td>
              <td>
                <Button variant="outline" onClick={() => handleViewClick(character.id)}>
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
          total={data.characters.info.pages}
          size="sm"
          withEdges
        />
      </Group>
    </Container>
  );
};

export default Characters;
