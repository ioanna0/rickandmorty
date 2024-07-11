import { useQuery } from '@apollo/client';
import { useState, useMemo, useCallback } from 'react';
import { Table, Button, Container, Title, Pagination, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import GET_CHARACTERS from 'graphql/queries/getCharacters.graphql';
import CustomLoader from '../CustomLoader';
import { GetCharactersQuery, GetCharactersQueryVariables } from '@/types/graphql';
import ErrorMessage from '../ErrorMessage';

const Characters = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data } = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GET_CHARACTERS,
    { variables: { page } }
  );
  const router = useRouter();

  const handleViewClick = useCallback(
    (id: string | undefined | null) => {
      if (!id) return;
      router.push(`/characters/${id}`);
    },
    [router]
  );

  const tableData = useMemo(
    () => ({
      caption: 'Characters from Rick and Morty TV show',
      head: ['Name', 'Species', 'Origin', 'Location', 'Actions'],
      body: data?.characters?.results?.map((character) => [
        character?.name,
        character?.species,
        character?.origin?.name,
        character?.location?.name,
        <Button
          variant="outline"
          onClick={() => handleViewClick(character?.id)}
          key={character?.id}
        >
          View
        </Button>,
      ]) as [string, string, string | undefined, string | undefined, JSX.Element][],
      // extract type
    }),
    [data, handleViewClick]
  );

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage error={error.message} />;

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
          total={data?.characters?.info?.pages || 1}
          size="sm"
          withEdges
        />
      </Group>
    </Container>
  );
};

export default Characters;
