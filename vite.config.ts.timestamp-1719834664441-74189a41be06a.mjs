// vite.config.ts
import { defineConfig } from "file:///Users/marcysia/swm/repos/t-rex-ui/node_modules/vite/dist/node/index.js";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "file:///Users/marcysia/swm/repos/t-rex-ui/node_modules/glob/dist/esm/index.js";
import dts from "file:///Users/marcysia/swm/repos/t-rex-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import react from "file:///Users/marcysia/swm/repos/t-rex-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { libInjectCss } from "file:///Users/marcysia/swm/repos/t-rex-ui/node_modules/vite-plugin-lib-inject-css/dist/index.js";
var __vite_injected_original_dirname = "/Users/marcysia/swm/repos/t-rex-ui";
var __vite_injected_original_import_meta_url = "file:///Users/marcysia/swm/repos/t-rex-ui/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
  assetsInclude: [
    "src/assets/*.css",
    "src/assets/*.svg",
    "src/assets/**",
    "src/assets/**/*.css"
  ],
  optimizeDeps: {
    esbuildOptions: {
      jsx: "automatic"
    }
  },
  build: {
    rollupOptions: {
      external: [
        "react",
        "@docusaurus/theme-common",
        "@docusaurus/theme-classic",
        "@docusaurus/core",
        "@docusaurus/useIsBrowser",
        "@docusaurus/useGlobalData",
        "@docusaurus/Translate",
        "@docusaurus/useBaseUrl",
        "@docusaurus/Link",
        "@docusaurus/isInternalUrl",
        "@docusaurus/useDocusaurusContext",
        "@docusaurus/router",
        "@docusaurus/Noop",
        "@docusaurus/useIsomorphicLayoutEffect",
        "@docusaurus/theme-common/internal",
        "@docusaurus/ExecutionEnvironment",
        "@docusaurus/BrowserOnly",
        "@docusaurus/Head",
        "@docusaurus/ErrorBoundary",
        "@mui/material"
      ],
      input: Object.fromEntries(
        glob.sync("src/**/*.{ts,tsx}").map((file) => [
          relative("src", file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, __vite_injected_original_import_meta_url))
        ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js"
      }
    },
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/main.ts"),
      formats: ["es"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWFyY3lzaWEvc3dtL3JlcG9zL3QtcmV4LXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWFyY3lzaWEvc3dtL3JlcG9zL3QtcmV4LXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9tYXJjeXNpYS9zd20vcmVwb3MvdC1yZXgtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGV4dG5hbWUsIHJlbGF0aXZlLCByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnO1xuaW1wb3J0IHsgZ2xvYiB9IGZyb20gJ2dsb2InO1xuXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgbGliSW5qZWN0Q3NzIH0gZnJvbSAndml0ZS1wbHVnaW4tbGliLWluamVjdC1jc3MnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIGxpYkluamVjdENzcygpLCBkdHMoeyBpbmNsdWRlOiBbJ2xpYiddIH0pXSxcbiAgYXNzZXRzSW5jbHVkZTogW1xuICAgICdzcmMvYXNzZXRzLyouY3NzJyxcbiAgICAnc3JjL2Fzc2V0cy8qLnN2ZycsXG4gICAgJ3NyYy9hc3NldHMvKionLFxuICAgICdzcmMvYXNzZXRzLyoqLyouY3NzJyxcbiAgXSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIGpzeDogJ2F1dG9tYXRpYycsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1xuICAgICAgICAncmVhY3QnLFxuICAgICAgICAnQGRvY3VzYXVydXMvdGhlbWUtY29tbW9uJyxcbiAgICAgICAgJ0Bkb2N1c2F1cnVzL3RoZW1lLWNsYXNzaWMnLFxuICAgICAgICAnQGRvY3VzYXVydXMvY29yZScsXG4gICAgICAgICdAZG9jdXNhdXJ1cy91c2VJc0Jyb3dzZXInLFxuICAgICAgICAnQGRvY3VzYXVydXMvdXNlR2xvYmFsRGF0YScsXG4gICAgICAgICdAZG9jdXNhdXJ1cy9UcmFuc2xhdGUnLFxuICAgICAgICAnQGRvY3VzYXVydXMvdXNlQmFzZVVybCcsXG4gICAgICAgICdAZG9jdXNhdXJ1cy9MaW5rJyxcbiAgICAgICAgJ0Bkb2N1c2F1cnVzL2lzSW50ZXJuYWxVcmwnLFxuICAgICAgICAnQGRvY3VzYXVydXMvdXNlRG9jdXNhdXJ1c0NvbnRleHQnLFxuICAgICAgICAnQGRvY3VzYXVydXMvcm91dGVyJyxcbiAgICAgICAgJ0Bkb2N1c2F1cnVzL05vb3AnLFxuICAgICAgICAnQGRvY3VzYXVydXMvdXNlSXNvbW9ycGhpY0xheW91dEVmZmVjdCcsXG4gICAgICAgICdAZG9jdXNhdXJ1cy90aGVtZS1jb21tb24vaW50ZXJuYWwnLFxuICAgICAgICAnQGRvY3VzYXVydXMvRXhlY3V0aW9uRW52aXJvbm1lbnQnLFxuICAgICAgICAnQGRvY3VzYXVydXMvQnJvd3Nlck9ubHknLFxuICAgICAgICAnQGRvY3VzYXVydXMvSGVhZCcsXG4gICAgICAgICdAZG9jdXNhdXJ1cy9FcnJvckJvdW5kYXJ5JyxcbiAgICAgICAgJ0BtdWkvbWF0ZXJpYWwnLFxuICAgICAgXSxcbiAgICAgIGlucHV0OiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICAgIGdsb2JcbiAgICAgICAgICAuc3luYygnc3JjLyoqLyoue3RzLHRzeH0nKVxuICAgICAgICAgIC5tYXAoKGZpbGUpID0+IFtcbiAgICAgICAgICAgIHJlbGF0aXZlKCdzcmMnLCBmaWxlLnNsaWNlKDAsIGZpbGUubGVuZ3RoIC0gZXh0bmFtZShmaWxlKS5sZW5ndGgpKSxcbiAgICAgICAgICAgIGZpbGVVUkxUb1BhdGgobmV3IFVSTChmaWxlLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgICBdKVxuICAgICAgKSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV1bZXh0bmFtZV0nLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvbWFpbi50cycpLFxuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsU0FBUyxvQkFBb0I7QUFDclQsU0FBUyxTQUFTLFVBQVUsZUFBZTtBQUMzQyxTQUFTLHFCQUFxQjtBQUM5QixTQUFTLFlBQVk7QUFFckIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQVA3QixJQUFNLG1DQUFtQztBQUFtSSxJQUFNLDJDQUEyQztBQVU3TixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFBQSxFQUM1RCxlQUFlO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLGdCQUFnQjtBQUFBLE1BQ2QsS0FBSztBQUFBLElBQ1A7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFPLE9BQU87QUFBQSxRQUNaLEtBQ0csS0FBSyxtQkFBbUIsRUFDeEIsSUFBSSxDQUFDLFNBQVM7QUFBQSxVQUNiLFNBQVMsT0FBTyxLQUFLLE1BQU0sR0FBRyxLQUFLLFNBQVMsUUFBUSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQUEsVUFDakUsY0FBYyxJQUFJLElBQUksTUFBTSx3Q0FBZSxDQUFDO0FBQUEsUUFDOUMsQ0FBQztBQUFBLE1BQ0w7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUN2QyxTQUFTLENBQUMsSUFBSTtBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
