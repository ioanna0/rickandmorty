import React from 'react';
import { useRouter } from 'next/router';
import { LocationDetails } from '@/components/Locations/LocationDetails';

const LocationDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <LocationDetails id={id as string} />;
};

export default LocationDetailsPage;
