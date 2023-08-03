module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:all', 'preact', 'prettier'],
  ignorePatterns: ['playwright.config.ts'],
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': ['warn', 'always'],
    'capitalized-comments': 0,
    'func-style': 0,
    'id-length': 0,
    'jest/no-done-callback': 0,
    'jsx-quotes': ['warn', 'prefer-double'],
    'max-lines': 0,
    'no-console': 1,
    'no-magic-numbers': 0,
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'always'],
    'sort-imports': 0,
  },
};
