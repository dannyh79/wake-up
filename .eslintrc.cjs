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
    'jest/no-focused-tests': 1,
    'jsx-quotes': ['warn', 'prefer-double'],
    'max-lines': 0,
    'max-lines-per-function': 1,
    'max-statements': 1,
    'multiline-comment-style': 0,
    'no-console': 1,
    'no-debugger': 1,
    'no-magic-numbers': 0,
    'no-ternary': 0,
    'one-var': 0,
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'sort-imports': 0,
  },
};
