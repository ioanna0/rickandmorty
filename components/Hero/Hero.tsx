import { Title, Text } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Rick & Martin API Explorer
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This is a simple application that allows you to explore Rick and Morty API. You can navigate
        to characters, episodes, and locations pages to see the data.
      </Text>
    </>
  );
}
