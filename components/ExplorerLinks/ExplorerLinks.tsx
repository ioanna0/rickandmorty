import { Container, Group, List, ThemeIcon } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

export function ExplorerLinks() {
  return (
    <Group justify="center" mt="xl">
      <Container>
        <h1>Rick and Morty API Explorer</h1>
        <List
          spacing="md"
          size="lg"
          center
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconChevronRight size={16} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <Link href="/characters">Characters</Link>
          </List.Item>
          <List.Item>
            <Link href="/episodes">Episodes</Link>
          </List.Item>
          <List.Item>
            <Link href="/locations">Locations</Link>
          </List.Item>
        </List>
      </Container>
    </Group>
  );
}
