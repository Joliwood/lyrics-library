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
  ],
  rules: {
    'no-console': 'off',
    //! WIP
    // 'import/extensions': 'off',
    'import/extensions': ['error', 'always'],
    'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
    'react/jsx-filename-extension': 'off',
  },
};
