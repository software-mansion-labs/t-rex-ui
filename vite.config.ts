import { defineConfig } from 'vite'
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'

import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
  assetsInclude: [
    'lib/assets/*.css',
    'lib/assets/*.svg',
    'lib/assets/**',
    'lib/assets/**/*.css',
  ],
  build: {
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        '@docusaurus/theme-common',
        '@docusaurus/theme-classic',
        '@docusaurus/core',
        '@docusaurus/useIsBrowser',
        '@docusaurus/useGlobalData',
        '@docusaurus/Translate',
        '@docusaurus/useBaseUrl',
        '@docusaurus/Link',
        '@docusaurus/isInternalUrl',
        '@docusaurus/useDocusaurusContext',
        '@docusaurus/router',
        '@docusaurus/Noop',
        '@docusaurus/useIsomorphicLayoutEffect',
        '@docusaurus/theme-common/internal',
        '@docusaurus/ExecutionEnvironment',
        '@docusaurus/BrowserOnly',
        '@docusaurus/Head',
        '@docusaurus/ErrorBoundary',
        '@mui/material',
      ],
      input: Object.fromEntries(
        glob
          .sync('lib/**/*.{ts,tsx}')
          .map((file) => [
            relative('lib', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
    // copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
  },
})
