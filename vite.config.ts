import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import eslint from 'vite-plugin-eslint';
import path from 'path';
import { VitePWA as vitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
/* eslint-disable camelcase */
export default defineConfig({
  plugins: [
    preact(),
    eslint(),
    vitePWA({
      includeAssets: ['**/*'],
      manifest: {
        background_color: '#ffffff',
        description: 'Wakes your brain up with some quizzes',
        display: 'standalone',
        // icons: [
        //   {
        //     sizes: '192x192',
        //     src: 'TODO-192x192.png',
        //     type: 'image/png',
        //   },
        //   {
        //     sizes: '512x512',
        //     src: 'TODO-512x512.png',
        //     type: 'image/png',
        //   },
        //   {
        //     purpose: 'any',
        //     sizes: '512x512',
        //     src: 'TODO-512x512.png',
        //     type: 'image/png',
        //   },
        //   {
        //     purpose: 'maskable',
        //     sizes: '512x512',
        //     src: 'TODO-512x512.png',
        //     type: 'image/png',
        //   },
        // ],
        name: 'Wake Up!',
        scope: '/',
        short_name: 'WakeUp!',
        start_url: '/',
        theme_color: '#ffffff',
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
