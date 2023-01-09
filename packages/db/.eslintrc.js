const base = require('../../.eslintrc');

module.exports = {
  ...base,
  root: false,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};