module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/extensions': ['error', 'always'],
    'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
  },
};
