import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import pluginJson from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/functions/fetch-data.js',
    output: [
      { file: 'lambda/fetch-data.js', format: 'cjs' },
    ],
    plugins: [
      pluginJson(),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      terser(),
    ],
    external: [
      'path',
      'jsdom',
      'http',
      'https',
      'url',
    ]
  },
];
