import { Container } from '@mantine/core';
import LocationsList from '@/components/Locations/LocationsList';

export default function Locations() {
  return (
    <Container mt={40} mb={40}>
      <LocationsList />
    </Container>
  );
}
