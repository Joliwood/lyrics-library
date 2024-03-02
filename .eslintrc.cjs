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
    'db/',
    'types/__generated_schemas__/',
  ],
  rules: {
    'no-console': 1,
    // 'import/extensions': 'off',
    // 'import/no-unresolved': 'off',
    // 'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
    'react/jsx-filename-extension': 'off',
  },
};
