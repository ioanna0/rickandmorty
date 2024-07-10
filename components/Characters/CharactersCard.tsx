import { Card, Title, SimpleGrid, Group, Avatar, Text } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import CharacterBadge from '../CharacterBadge';

export type CardResident = {
  id: string;
  name: string;
  species: string;
  status: string;
  image: string;
};

type CharactersCardProps = {
  residents: CardResident[];
  title: string;
};

const CharactersCard = ({ residents, title }: CharactersCardProps) => (
  <Card shadow="sm" padding="lg">
    <Title order={2} mb="md">
      {title}
    </Title>
    <SimpleGrid cols={3}>
      {residents.map((resident) => (
        <Link href={`/characters/${resident?.id}`} passHref key={resident?.id}>
          <Group component="a" wrap="nowrap" style={{ alignItems: 'flex-start' }}>
            <Avatar src={resident?.image} alt={resident?.name || 'Resident image'} radius="xl" />
            <div>
              <Text>{resident?.name}</Text>
              <Text size="xs" c="dimmed">
                {resident?.species}
              </Text>
              <CharacterBadge status={resident?.status || ''} />
            </div>
          </Group>
        </Link>
      ))}
    </SimpleGrid>
  </Card>
);

export default CharactersCard;
