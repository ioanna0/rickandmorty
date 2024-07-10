import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Table, Button, Loader, Container, Title, Pagination, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { GET_LOCATIONS } from '@/utils/graphql-queries';

const Locations = () => {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_LOCATIONS, { variables: { page } });
  const router = useRouter();

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewClick = (id: string) => {
    router.push(`/locations/${id}`);
  };

  return (
    <Container>
      <Title order={1}>Locations</Title>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Dimension</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.locations.results.map((location: any) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.type}</td>
              <td>{location.dimension}</td>
              <td>
                <Button variant="outline" onClick={() => handleViewClick(location.id)}>
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
          total={data.locations.info.pages}
          size="sm"
          withEdges
        />
      </Group>
    </Container>
  );
};

export default Locations;
