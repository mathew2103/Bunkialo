import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['./icons/bunkialo logo.svg'],
      manifest: {
        name: 'Bunkialo',
        short_name: 'Bunkialo',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: './icons/bunkialo logo.svg',
            sizes: '72x72',
            type: 'image/svg+xml'
          },
          {
            src: './icons/bunkialo logo.svg',
            sizes: '96x96',
            type: 'image/svg+xml'
          },
          {
            src: './icons/bunkialo logo.svg',
            sizes: '128x128',
            type: 'image/svg+xml'
          },
          {
            src: './icons/bunkialo logo.svg',
            sizes: '144x144',
            type: 'image/svg+xml'
          },
          {
            src: './icons/bunkialo logo.svg',
            sizes: '152x152',
            type: 'image/svg+xml'
          },
          {
            src: './icons/bunkialo logo.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: './icons/bunkialo logo.svg',
            sizes: '384x384',
            type: 'image/svg+xml'
          },
          {
            src: './icons/bunkialo logo.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})
