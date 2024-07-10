import { Center, Loader } from '@mantine/core';
import React from 'react';

const CustomLoader = () => (
  <Center>
    <Loader data-testid="loader" />
  </Center>
);

export default CustomLoader;
