import { Badge } from '@mantine/core';
import React from 'react';

type CharacterBadgeProps = {
  status: string;
};

const CharacterBadge = ({ status }: CharacterBadgeProps) => (
  <Badge color={status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'gray'}>{status}</Badge>
);

export default CharacterBadge;
