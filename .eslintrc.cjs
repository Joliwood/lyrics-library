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
  rules: {
    'no-console': 'off',
    'import/extensions': ['error', 'always'],
    'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
    'react/jsx-filename-extension': 'off',
  },
};
