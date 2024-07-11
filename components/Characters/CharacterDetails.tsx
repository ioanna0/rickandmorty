import React, { useMemo } from 'react';
import { Container, Card, Group, Stack, Title, Anchor, List, Image, Text } from '@mantine/core';
import { useQuery } from '@apollo/client';
import GET_CHARACTER_BY_ID from 'graphql/queries/getCharacterById.graphql';
import { GetCharacterByIdQuery, GetCharacterByIdQueryVariables } from '@/types/graphql';
import CharacterBadge from '../CharacterBadge';
import CustomLoader from '../CustomLoader';
import ErrorMessage from '../ErrorMessage';
import NoDataAvailable from '../NoDataAvailable';

interface CharacterDetailsProps {
  id: string;
}

const CharacterDetails = ({ id }: CharacterDetailsProps) => {
  const { loading, error, data } = useQuery<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>(
    GET_CHARACTER_BY_ID,
    {
      variables: { id },
    }
  );

  const character = data?.character;

  const characterDetails = useMemo(() => {
    if (!character) return null;

    return (
      <>
        <Group wrap="nowrap">
          <Image
            src={character.image}
            alt={character.name || 'Character image'}
            radius="md"
            width={200}
          />
          <Stack gap="sm">
            <Title order={2}>{character.name}</Title>
            <CharacterBadge status={character.status || ''} />
            <Text size="md" c="dimmed">
              Species: {character.species}
            </Text>
            <Text size="md" c="dimmed">
              Gender: {character.gender}
            </Text>
            {character.origin?.name && (
              <Text size="md" c="dimmed">
                Origin: {character.origin.name}
              </Text>
            )}
            {character.location?.name && (
              <Text size="md" c="dimmed">
                Location:{' '}
                <Anchor href={`/locations/${character.location.id}`}>
                  {character.location.name}
                </Anchor>
              </Text>
            )}
          </Stack>
        </Group>
        <Card shadow="sm" padding="lg">
          <Title order={3} mb="md">
            Episodes
          </Title>
          <List spacing="sm" size="sm" center>
            {character.episode.map((ep) => (
              <List.Item key={ep?.id}>
                <Anchor href={`/episodes/${ep?.id}`}>{ep?.name}</Anchor>
              </List.Item>
            ))}
          </List>
        </Card>
      </>
    );
  }, [character]);

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage error={error.message} />;
  if (!character) return <NoDataAvailable />;

  return (
    <Container>
      <Card shadow="sm" padding="lg" mb="20px">
        {characterDetails}
      </Card>
    </Container>
  );
};

export default React.memo(CharacterDetails);
