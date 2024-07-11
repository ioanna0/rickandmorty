import React from 'react';
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const ErrorMessage = ({ error }: { error: string }) => (
  <Alert
    icon={<IconAlertCircle size={16} />}
    title="Error"
    color="red"
    radius="md"
    withCloseButton
    data-testid="error"
  >
    {error}
  </Alert>
);

export default ErrorMessage;
