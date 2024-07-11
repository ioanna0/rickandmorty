# Rick and Morty API Explorer

This is a simple web application that allows users to explore the [Rick and Morty API](https://rickandmortyapi.com/graphql). It was built using the Mantine Next.js template.

## Technologies
- Next.js with Pages Router
- GraphQL with Apollo Client
- codegen for generating GraphQL types from queries
- Mantine UI components

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `generate` – generates graphql types with [graphql-codegen](https://www.graphql-code-generator.com/)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `lint` and `typecheck` scripts


## Features

- [x] List of characters - Route: `/characters` - GraphQL query: `getCharacters.graphql`
- [x] List of episodes - Route: `/episodes` -  GraphQL query: `getEpisodes.graphql`
- [x] List of locations - Route: `/locations` -  GraphQL query: `getLocations.graphql`
- [x] Character details - Route: `/characters/[id]` -  GraphQL query: `getCharacterById.graphql`
- [x] Episode details - Route: `/episodes/[id]` -  GraphQL query: `getEpisodeById.graphql`
- [x] Location details - Route: `/locations/[id]` -  GraphQL query: `getLocationById.graphql`

All generated types are available in `types/graphql.ts` file.

### CRUD operations

If we wanted to enhance this application, to have CRUD operations we can do so by adding new routes and GraphQL queries. 
For example we can add a new route `/characters/new` that will allow users to create a new character. We can add a new GraphQL mutation `createCharacter.graphql` that will allow users to create a new character. The UI component would live in the `components/characters` folder and the form would be created using Mantine UI components.

We could also leverage Next.js server APIs to handle the GraphQL mutations especially the mutations. We can create a new file in the `pages/api` folder called `characters.ts` that will handle the GraphQL mutations for characters.

