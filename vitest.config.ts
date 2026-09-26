import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      // fileURLToPath 还原 percent-encoding；`.pathname` 在含中文的目录下会得到 %E7... 导致模块解析失败
      '~': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    // GK2 site fork: tests/template-meta/ holds the upstream TEMPLATE's own
    // meta-suite (demo fixtures, landing modules, ja locale, FORKER blocks).
    // Those surfaces are intentionally removed on this rebranded branch, so
    // the suite cannot pass here — excluded instead of deleted so upstream
    // merges stay meaningful. See tests/template-meta/README.md.
    exclude: ['tests/template-meta/**', '**/node_modules/**'],
  },
});
