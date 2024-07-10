import LocationsList from '@/components/Locations/LocationsList';
import { Container } from '@mantine/core';

export default function Locations() {
  return (
    <Container mt={40}>
      <LocationsList />
    </Container>
  );
}
