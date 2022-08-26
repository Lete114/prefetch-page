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
      file: production ? 'dist/prefetchm.js' : 'public/dist/prefetchm.js'
    }
  },
  {
    input: 'src/index.js',
    output: {
      exports: 'auto',
      format: 'cjs',
      name: 'prefetch',
      file: production ? 'dist/prefetch.cjs' : 'public/dist/prefetch.cjs'
    }
  }
]
