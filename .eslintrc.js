module.exports = {
  env: {
    es6: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript'],
  plugins: ['import'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'types/__generated_schemas__/',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-console': 1,
    'import/prefer-default-export': 'off',
    'react/no-unescaped-entities': 0,
    'no-underscore-dangle': 'off',
    'react/function-component-definition': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'arrow-body-style': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
    'react/no-array-index-key': 'off',
  },
};
