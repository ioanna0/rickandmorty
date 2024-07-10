import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Table, Button, Container, Title, Pagination, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { GET_LOCATIONS } from '@/utils/graphql-queries';
import CustomLoader from '../CustomLoader';

const Locations = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_LOCATIONS, { variables: { page } });
  const router = useRouter();

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewClick = (id: string) => {
    router.push(`/locations/${id}`);
  };

  const tableData = {
    caption: 'Locations from Rick and Morty TV show',
    head: ['Name', 'Type', 'Dimension', 'Actions'],
    body: data.locations.results.map((location: any) => [
      location.name,
      location.type,
      location.dimension,
      <Button variant="outline" onClick={() => handleViewClick(location.id)}>
        View
      </Button>,
    ]),
  };

  return (
    <Container>
      <Title order={1} mb={40}>
        Locations
      </Title>
      <Table highlightOnHover data={tableData} />

      <Group p="apart" mt="md">
        <Pagination
          value={page}
          onChange={setPage}
          total={data.locations.info.pages}
          size="sm"
          withEdges
        />
      </Group>
    </Container>
  );
};

export default Locations;
