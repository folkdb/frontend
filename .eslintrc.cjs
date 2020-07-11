module.exports = {
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: [
    'import',
    'svelte3',
  ],
  overrides: [{
    files: [ '*.svelte' ],
    processor: 'svelte3/svelte3',
    excludedFiles: 'src/parts/Main.svelte',
  }], 
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: [ 'test/*.js' ] },
    ],
    'import/extensions': [
      'error',
      'always',
      { ignorePackages: true },
    ],
  },
  settings: {
    'svelte3/ignore-styles': () => true,
    'svelte3/ignore-warnings': () => true,
  },
};
