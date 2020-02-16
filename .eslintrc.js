module.exports = {
  extends: [
    'react-app', // for editor
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['babel'],
  rules: {
    // quotes: ['error', 'single'],
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'babel/no-unused-expressions': 'warn',
    'babel/no-unused-vars': 'warn',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': [
      'warn', {
        // singleQuote: true,
        // semi: true,
        // trailingComma: 'all',
        // jsxBracketSameLine: true,
      },
    ],
  },
}