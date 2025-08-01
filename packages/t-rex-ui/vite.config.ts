import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';

import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: 'react',
    }),
    libInjectCss(),
    dts({ include: ['lib'] }),
  ],
  assetsInclude: [
    'src/assets/*.css',
    'src/assets/*.svg',
    'src/assets/**',
    'src/assets/**/*.css',
  ],
  build: {
    rollupOptions: {
      external: [
        'react',
        /@docusaurus\/.*/,
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
          .sync('src/**/*.{ts,tsx}')
          .map((file) => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
    },
  },
});
