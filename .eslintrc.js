module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins:['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    use:'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier":"error",
    "class-methods-use-this":"off",
    "import/prefer-default-export":"off",
    "no-param-reassign":"off",
    "camelcase":"off",
    "no-unused-vars":["error",{"argsIgnorePattern":"next"}],
  },
};
