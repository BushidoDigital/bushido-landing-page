// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    // Load our main stylesheet (currently located under app/assets)
    css: ['~/assets/css/main.css'],
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: 'Bushido.digital — Backend systems & frontend apps',
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                // Default theme color matches the global (non-portfolio) background
                { name: 'theme-color', content: '#10c8ff' },
                { name: 'description', content: 'We design, build and operate reliable web apps, APIs and data pipelines. Nuxt/Vue on the frontend, Node/TypeScript on the backend. Performance, security and maintainability first.' }
            ],
            link: [
                // Comic display + Japanese support
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bangers&family=Noto+Sans+JP:wght@400;700;900&display=swap' }
            ]
        }
    },
    modules: [
        '@nuxt/content',
        '@nuxt/hints',
        '@nuxt/scripts',
        '@nuxt/ui',
        '@nuxt/eslint',
        'motion-v/nuxt',
    ]
})