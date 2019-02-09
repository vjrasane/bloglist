module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['standard', 'standard-react'],
  // extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  rules: {
    'react/prop-types': 0
  }
  // parserOptions: {
  //   ecmaFeatures: {
  //     experimentalObjectRestSpread: true,
  //     jsx: true
  //   },
  //   sourceType: 'module'
  // },
  // plugins: ['react', 'jest'],
  // rules: {
  //   indent: ['error', 2],
  //   'linebreak-style': ['warn', 'windows'],
  //   quotes: ['warn', 'single'],
  //   semi: ['error', 'never'],
  //   eqeqeq: 'error',
  //   'no-trailing-spaces': 'error',
  //   'object-curly-spacing': ['warn', 'always'],
  //   'arrow-spacing': ['error', { before: true, after: true }],
  //   'no-case-declarations': 0,
  //   'react/prop-types': 0
  // }
}
