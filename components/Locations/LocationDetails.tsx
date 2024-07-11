import React, { useMemo } from 'react';
import { Container, Card, Title, Text } from '@mantine/core';
import { useQuery } from '@apollo/client';
import GET_LOCATION_BY_ID from 'graphql/queries/getLocationById.graphql';
import { GetLocationByIdQuery, GetLocationByIdQueryVariables } from '@/types/graphql';
import CharactersCard, { CardResident } from '../Characters/CharactersCard';
import CustomLoader from '../CustomLoader';
import ErrorMessage from '../ErrorMessage';
import NoDataAvailable from '../NoDataAvailable';

interface LocationDetailsProps {
  id: string;
}

export const LocationDetails = ({ id }: LocationDetailsProps) => {
  const { loading, error, data } = useQuery<GetLocationByIdQuery, GetLocationByIdQueryVariables>(
    GET_LOCATION_BY_ID,
    {
      variables: { id },
    }
  );

  const locationData = useMemo(() => {
    if (data?.location) {
      const { name, type, dimension, created, residents } = data.location;
      return {
        name,
        type,
        dimension,
        created: created ? new Date(created).toLocaleDateString() : undefined,
        residents: residents as CardResident[],
      };
    }
    return null;
  }, [data]);

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage error={error.message} />;
  if (!locationData) return <NoDataAvailable />;

  const { name, type, dimension, created, residents } = locationData;

  return (
    <Container>
      <Card shadow="sm" padding="lg" mb="20px">
        <Title order={1}>{name}</Title>
        <Text size="lg">Type: {type}</Text>
        <Text size="lg">Dimension: {dimension}</Text>
        {created && (
          <Text size="sm" c="dimmed">
            Created: {created}
          </Text>
        )}
      </Card>
      <CharactersCard residents={residents} title="Residences" />
    </Container>
  );
};
