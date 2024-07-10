import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Card, Image, Text, Container, Title, Group, List } from '@mantine/core';
import { GET_CHARACTER_BY_ID } from '@/utils/graphql-queries';
import Link from 'next/link';
import CustomLoader from '@/components/CustomLoader';

const CharacterDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id: id },
  });

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const { character } = data;

  return (
    <Container>
      <Card shadow="sm" padding="lg">
        <Group>
          <Image src={character.image} alt={character.name} />
          <div>
            <Title order={2}>{character.name}</Title>
            <Text>Status: {character.status}</Text>
            <Text>Species: {character.species}</Text>
            <Text>Gender: {character.gender}</Text>
            {character.origin?.name && <Text>Origin: {character.origin.name}</Text>}
            {character.location?.name && <Text>Location: {character.location.name}</Text>}
          </div>
        </Group>
        <Title order={3} mt="lg">
          Episodes
        </Title>
        <List>
          {character.episode.map((ep: any) => (
            <List.Item key={ep.id}>
              <Link href={`/episodes/${ep.id}`}>{ep.name}</Link>
            </List.Item>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default CharacterDetail;
