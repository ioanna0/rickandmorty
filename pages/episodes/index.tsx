import { Container } from '@mantine/core';
import EpisodesList from '@/components/Episodes/EpisodesList';

export default function Episodes() {
  return (
    <Container mt={40} mb={40}>
      <EpisodesList />
    </Container>
  );
}
