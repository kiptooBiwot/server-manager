import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [tsconfigPaths(), swc.vite()],

  test: {
    globals: true,
    environment: 'node',

    // Test files
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],

    // Exclude dependencies and build output
    exclude: ['node_modules', 'dist'],

    // Coverage
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.module.ts',
        '**/main.ts',
        '**/*.dto.ts',
      ],
    },

    // Reset mocks between tests
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
});
