module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'standard-react',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true,
    node: true
  },
  rules: {
    'multiline-ternary': 'off',
    'space-before-function-paren': 'off'
  }
}
