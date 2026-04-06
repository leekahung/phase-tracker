import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import netlifyPlugin from '@netlify/vite-plugin-react-router';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [reactRouter(), netlifyPlugin(), tailwindcss()],
});
