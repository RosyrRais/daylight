module.exports = {
  root: true,
  parserOptions: { tsconfigRootDir: __dirname },
  plugins: ['prettier'],
  rules: {
    // eslint-disable-next-line
    'prettier/prettier': 'error',
    // eslint-disable-next-line no-magic-numbers
    indent: ['error', 2],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      extends: '@byted/eslint-config-standard',
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: '@byted/eslint-config-standard-ts',
      rules: {
        // eslint-disable-next-line no-magic-numbers
        '@typescript-eslint/indent': ['error', 2],
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      extends: '@byted/eslint-config-standard-react/jsx-runtime',
    },
    {
      files: ['*'],
      rules: {
        'no-autofix/@typescript-eslint/no-unnecessary-condition': 'off',
        'no-autofix/@typescript-eslint/no-unnecessary-boolean-literal-compare':
          'off',
        'no-autofix/react/jsx-no-leaked-render': 'off',
      },
    },
  ],
};
