import { useRouter } from 'next/router';
import CharacterDetails from '@/components/Characters/CharacterDetails';

const CharacterDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <CharacterDetails id={id as string} />;
};

export default CharacterDetailPage;
