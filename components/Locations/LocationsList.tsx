import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Table, Button, Container, Title, Pagination, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import GET_LOCATIONS from 'graphql/queries/getLocations.graphql';
import CustomLoader from '../CustomLoader';
import { GetLocationsQuery, GetLocationsQueryVariables } from '@/types/graphql';

const Locations: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { loading, error, data } = useQuery<GetLocationsQuery, GetLocationsQueryVariables>(
    GET_LOCATIONS,
    { variables: { page } }
  );
  const router = useRouter();

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleViewClick = (id: string | null | undefined) => {
    if (!id) return;
    router.push(`/locations/${id}`);
  };

  const tableData = {
    caption: 'Locations from Rick and Morty TV show',
    head: ['Name', 'Type', 'Dimension', 'Actions'],
    body: data?.locations?.results?.map((location) => [
      location?.name,
      location?.type,
      location?.dimension,
      <Button variant="outline" onClick={() => handleViewClick(location?.id)} key={location?.id}>
        View
      </Button>,
    ]) as [string, string, string, JSX.Element][],
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
          total={data?.locations?.info?.pages || 1}
          size="sm"
          withEdges
        />
      </Group>
    </Container>
  );
};

export default Locations;
