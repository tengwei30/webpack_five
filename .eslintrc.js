module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  globals: {
    $: true,
    process: true,
    __dirname: true
  },
  parserOptions: {
    // parser: require.resolve('@typescript-eslint/parser'),
    parser: 'babel-eslint',
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: 'module',
    ecmaVersion: 6
  },
  plugins: ['@typescript-eslint', 'html', 'vue'],
  settings: {
    'import/ignore': ['node_modules']
  },
  rules: {
    quotes: [2, 'single'],
    'no-console': 0,
    'no-debugger': 1,
    'no-var': 1,
    semi: ['error', 'always'],
    'no-irregular-whitespace': 0,
    'no-trailing-spaces': 1,
    'eol-last': 0,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used'
      }
    ],
    'no-case-declarations': 0,
    'no-underscore-dangle': 0,
    'no-alert': 2,
    'no-lone-blocks': 0,
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-delete-var': 2,
    'no-dupe-keys': 2,
    'use-isnan': 2,
    'no-duplicate-case': 2,
    'no-dupe-args': 2,
    'no-empty': 2,
    'no-func-assign': 2,
    'no-invalid-this': 0,
    'no-redeclare': 2,
    'no-spaced-func': 2,
    'no-this-before-super': 0,
    'no-undef': 2,
    'no-return-assign': 0,
    'no-script-url': 2,
    'no-use-before-define': 2,
    'no-extra-boolean-cast': 0,
    'no-unreachable': 1,
    'comma-dangle': 2,
    'no-mixed-spaces-and-tabs': 2,
    'prefer-arrow-callback': 0,
    'arrow-parens': 0,
    'arrow-spacing': 0,
    camelcase: 0,
    'jsx-quotes': [1, 'prefer-double']
  }
};
