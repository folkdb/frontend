import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';


export default [
  {
    input: 'src/functions/fetch-data.js',
    output: [
      { file: 'lambda/fetch-data.js', format: 'cjs' },
    ],
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
    ],
    external: [
      'http',
      'https',
      'url',
    ]
  },
];
