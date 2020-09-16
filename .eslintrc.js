module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'no-void': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/first': 'off',
    'import/order': 'off',
    'linebreak-style': 'off',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'var', next: '*' },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    '@typescript-eslint/no-unused-vars': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
