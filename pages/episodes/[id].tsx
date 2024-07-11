import React from 'react';
import { useRouter } from 'next/router';
import EpisodeDetails from '@/components/Episodes/EpisodeDetails';

const EpisodeDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EpisodeDetails id={id as string} />;
};

export default EpisodeDetailsPage;
