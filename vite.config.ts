import { join } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  root: join(process.cwd(), '/src'),
  test: {
    globals: true,
    window: true,
    environment: 'jsdom',
  },
}))
