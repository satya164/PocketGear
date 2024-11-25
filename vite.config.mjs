import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.web.mjs',
  '.mjs',
  '.json',
];

/** @type {import('vite').UserConfig} */
export default {
  plugins: [commonjs(), react(), flowPlugin()],
  define: {
    'global': 'window',
    '__DEV__': JSON.stringify(process.env.NODE_ENV !== 'production'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    extensions: extensions,
    alias: {
      'react-native': 'react-native-web',
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
      },
      plugins: [esbuildFlowPlugin(undefined, () => 'jsx')],
    },
  },
};
