import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOCATION_BY_ID } from '@/utils/graphql-queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomLoader from '@/components/CustomLoader';

const LocationDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery(GET_LOCATION_BY_ID, {
    variables: { id: id },
  });

  if (loading) return <CustomLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const { location } = data;

  return (
    <div>
      <h1>{location.name}</h1>
      <p>Name: {location.name}</p>
      <p>Type: {location.type}</p>
      <h2>Residents</h2>
      <ul>
        {location.residents.map(
          (residents: {
            id: React.Key | null | undefined;
            name:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
            species:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
            status:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | null
              | undefined;
          }) => (
            <li key={residents.id}>
              <Link href={`/characters/${residents.id}`}>
                {residents.name} - {residents.species} ({residents.status})
              </Link>
            </li>
          )
        )}
      </ul>
      <p>Created: {location.created}</p>
    </div>
  );
};

export default LocationDetails;
