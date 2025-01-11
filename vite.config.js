import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['src/assets/icon2.png'],
      manifest: {
        name: 'Bunkialo',
        short_name: 'Bunkialo',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'src/assets/icon2.png',
            sizes: '863x866',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
