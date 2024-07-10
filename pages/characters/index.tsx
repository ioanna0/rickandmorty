import { Container } from '@mantine/core';
import CharacterList from '@/components/Characters/CharacterList';

export default function Characters() {
  return (
    <Container mt={40} mb={40}>
      <CharacterList />
    </Container>
  );
}
