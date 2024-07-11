import { Container, Flex } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

const Navbar = () => (
  <nav>
    <Container>
      <Flex justify="space-between" align="center" mt={20}>
        <Link href="/">R&M API Explorer</Link>
        <Flex gap="16px">
          <Link href="/characters">Characters</Link>
          <Link href="/episodes">Episodes</Link>
          <Link href="/locations">Locations</Link>
        </Flex>
      </Flex>
    </Container>
  </nav>
);

export default Navbar;
