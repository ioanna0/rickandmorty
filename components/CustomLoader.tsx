import { Center, Loader } from '@mantine/core';
import React from 'react';

const CustomLoader = () => {
  return (
    <Center>
      <Loader data-testid="loader" />
    </Center>
  );
};

export default CustomLoader;
