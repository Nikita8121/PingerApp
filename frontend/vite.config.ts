import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react(), tsconfigPaths(), svgr({ exportAsDefault: false })],
  define: {
    'process.env': process.env,
  },
  server: {
    host: '0.0.0.0',
    port: 8000, // This is the port which we will use in docker5
  },
  preview: {
    host: '0.0.0.0',
    port: 8000,
  },
});
