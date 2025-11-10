// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  modules: ['shadcn-nuxt', '@vite-pwa/nuxt', '@pinia/nuxt', '@nuxtjs/supabase', '@vesp/nuxt-fontawesome'],
  fontawesome: {
    icons: {
      brands: ['google'],
    },
  },
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/login', '/register'],
    }
  },
  pwa: {
    manifest: {
      name: 'Super',
      short_name: 'Super',
      description: 'My incredible Nuxt 3 PWA',
      theme_color: '#ffffff',
      lang: 'en',
      icons: [
        {
          "src": "/pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "/pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "/maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    },
    devOptions: {
      enabled: false
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

})