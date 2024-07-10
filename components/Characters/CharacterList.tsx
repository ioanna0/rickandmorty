import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Table, TableData, Button, Container, Title, Pagination, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { GET_CHARACTERS } from '@/utils/graphql-queries';
import CustomLoader from '../CustomLoader';

const Characters = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, { variables: { page } });
  const router = useRouter();

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewClick = (id: string) => {
    router.push(`/characters/${id}`);
  };

  const tableData: TableData = {
    caption: 'Characters from Rick and Morty TV show',
    head: ['Name', 'Species', 'Origin', 'Location', 'Actions'],
    body: data.characters.results.map((character: any) => [
      character.name,
      character.species,
      character.origin?.name,
      character.location?.name,
      <Button variant="outline" onClick={() => handleViewClick(character.id)}>
        View
      </Button>,
    ]),
  };

  return (
    <Container>
      <Title order={1} mb={40}>
        Characters
      </Title>
      <Table highlightOnHover data={tableData} />
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
