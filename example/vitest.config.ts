import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      // Globbed on purpose: a new runtime file lands in the denominator
      // and an untested one drops the percentage (as sites/www does).
      // main.ts is the toolkit wiring and is covered by the functional
      // test against the bundle (actions.md INV-ACTIONS-6), not here.
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/main.ts'],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
})
