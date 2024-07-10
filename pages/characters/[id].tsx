import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Card, Image, Text, Container, Title, Group, List, Stack, Anchor } from '@mantine/core';
import GET_CHARACTER_BY_ID from 'graphql/queries/getCharacterById.graphql';
import CustomLoader from '@/components/CustomLoader';
import { GetCharacterByIdQuery, GetCharacterByIdQueryVariables } from '@/types/graphql';
import CharacterBadge from '@/components/CharacterBadge';

const CharacterDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery<GetCharacterByIdQuery, GetCharacterByIdQueryVariables>(
    GET_CHARACTER_BY_ID,
    {
      variables: { id: id as string },
    }
  );

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.character) return <p>No data available</p>;

  const { character } = data;

  return (
    <Container>
      <Card shadow="sm" padding="lg" mb="20px">
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
      </Card>
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
    </Container>
  );
};

export default CharacterDetail;
