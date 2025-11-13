module.exports = {
  root: true,
  parserOptions: { tsconfigRootDir: __dirname },
  plugins: ['prettier'],
  rules: {
    // eslint-disable-next-line
    'prettier/prettier': 'warn',
    // eslint-disable-next-line no-magic-numbers
    indent: ['warn', 2],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      extends: '@byted/eslint-config-standard',
      rules: {
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: '@byted/eslint-config-standard-ts',
      rules: {
        // eslint-disable-next-line no-magic-numbers
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      extends: '@byted/eslint-config-standard-react/jsx-runtime',
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['*'],
      rules: {
        'no-autofix/@typescript-eslint/no-unnecessary-condition': 'off',
        'no-autofix/@typescript-eslint/no-unnecessary-boolean-literal-compare':
          'off',
        'no-autofix/react/jsx-no-leaked-render': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
