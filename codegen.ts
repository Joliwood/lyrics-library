import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './app/schemas/generalSchema.gql',
  // declarationKind: 'interface',
  generates: {
    './types/__generated_schemas__/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      // config: {
      // WIP test to support class datamappers
      //   declarationKind: 'class',
      // },
    },
  },
};

export default config;
