module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript',
  ],
  plugins: ['import'],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'db/',
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
    'react/jsx-filename-extension': 'off',
  },
};
