import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'
import { babel } from '@rollup/plugin-babel'

const production = !process.env.ROLLUP_WATCH
const plugins = [
  // Start a local service
  !production && serve({ contentBase: 'public', port: 6870 }),

  // building minify
  production && terser(),

  // building babel
  babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] })
]

export default [
  {
    input: 'src/attribute.js',
    output: {
      format: 'iife',
      name: 'prefetch',
      file: production ? 'dist/prefetch.attr.js' : 'public/dist/prefetch.attr.js'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      format: 'iife',
      name: 'prefetch',
      file: production ? 'dist/prefetch.js' : 'public/dist/prefetch.js'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'prefetch',
      file: production ? 'dist/prefetch.esm.js' : 'public/dist/prefetch.esm.js'
    }
  },
  {
    input: 'src/index.js',
    output: {
      exports: 'auto',
      format: 'cjs',
      name: 'prefetch',
      file: production ? 'dist/prefetch.cjs.js' : 'public/dist/prefetch.cjs.js'
    }
  }
]
