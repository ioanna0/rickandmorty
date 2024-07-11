import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import client from '../utils/apollo-client';
import { theme } from '../utils/theme';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <Head>
          <title>Rick And Morty API Explorer</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </MantineProvider>
    </ApolloProvider>
  );
}
