import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.d.ts'],
      thresholds: {
        // Thresholds sur les fichiers avec logique uniquement (helpers, factories)
        // Les fichiers de définitions de types purs ont légitimement 0% de coverage
        lines: 40,
        functions: 70,
        branches: 70,
      },
    },
  },
});
