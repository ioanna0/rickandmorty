import React from 'react';
import { Card, Container, Text, Title } from '@mantine/core';
import { useQuery } from '@apollo/client';
import GET_LOCATION_BY_ID from 'graphql/queries/getLocationById.graphql';
import { useRouter } from 'next/router';
import CustomLoader from '@/components/CustomLoader';
import { GetLocationByIdQuery, GetLocationByIdQueryVariables } from '@/types/graphql';
import CharactersCard, { CardResident } from '@/components/Characters/CharactersCard';

const LocationDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<GetLocationByIdQuery, GetLocationByIdQueryVariables>(
    GET_LOCATION_BY_ID,
    {
      variables: { id: id as string },
    }
  );

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.location) return <p>No data available</p>;

  const { location } = data;

  return (
    <Container>
      <Card shadow="sm" padding="lg" mb="20px">
        <Title order={1}>{location.name}</Title>
        <Text size="lg">Type: {location.type}</Text>
        <Text size="lg">Dimension: {location.dimension}</Text>
        {location.created && (
          <Text size="sm" c="dimmed">
            Created: {new Date(location.created).toLocaleDateString()}
          </Text>
        )}
      </Card>
      <CharactersCard residents={location.residents as CardResident[]} title="Residences" />
    </Container>
  );
};

export default LocationDetails;
