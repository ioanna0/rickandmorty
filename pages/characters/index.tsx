import CharacterList from '@/components/Characters/CharacterList';
import { Container } from '@mantine/core';

export default function Characters() {
  return (
    <Container mt={40}>
      <CharacterList />
    </Container>
  );
}
