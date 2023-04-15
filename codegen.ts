import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    'https://api.thegraph.com/subgraphs/name/lumen-limitless/ascension-subgraph',
  ],
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client',
    },
  },
}
export default config
