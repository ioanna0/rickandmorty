import React from 'react';
import { Alert, Center } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

const NoDataAvailable = () => (
  <Center>
    <Alert
      icon={<IconInfoCircle size={16} />}
      title="Information"
      color="blue"
      radius="md"
      withCloseButton
    >
      No data available
    </Alert>
  </Center>
);

export default NoDataAvailable;
