import { defineConfig } from 'vitest/config'

// Separate config: the functional suite spawns dist/index.js and
// measures nothing, so it stays out of the coverage denominator.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.functional.ts'],
    testTimeout: 20_000,
  },
})
