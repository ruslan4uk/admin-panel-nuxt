module.exports = {
    debug: false,
    mode: 'universal',
    /**
     * Headers of the page
     */
    head: {
        title: 'admin-panel-nuxt',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Nuxt.js project'
            },
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
            },
        ],
    },

    /**
     * Customize the progress bar color
     */
    loading: {
        color: '#3B8070',
    },

    /**
     * Route
     */
    router: {
        middleware: [
            'clearValidationErrors'
        ]
    },

    /**
     * Load plugins
     */
    plugins: [
        './plugins/mixins/validation',
        './plugins/mixins/user',
        './plugins/axios',
   ],

    /**
     * Auth
     */
    auth: {
        strategies: {
            local: {
              endpoints: {
                login: {
                  url: 'auth/login', method: 'post', propertyName: 'token'
                },
                user: {
                  url: 'auth/me', method: 'post', propertyName: 'data'
                },
                logout: {
                  method: 'get',
                  url: 'auth/logout', method: 'post'
                }
              }
            }
          },
          redirect: {
            login: '/auth/login',
            home: '/'
          },
    },

    /**
     * Load modules
     */
    modules: [
        // Simple usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
    ],


    /**
     * Axios config
     */
    axios: {
        baseURL: 'http://localhost:8003/api/v2',
    },


    /**
     * Build configuration
     */
    build: {
        /**
         * Run ESLint on save
         */
        extractCSS: true,
        // extend(config, {
        //     isDev,
        //     isClient,
        // }) {
        //     if (isDev && isClient) {
        //         config.module.rules.push({
        //             enforce: 'pre',
        //             test: /\.(js|vue)$/,
        //             loader: 'eslint-loader',
        //             exclude: /(node_modules)/
        //         })
        //     }
        // }
        extend(config, ctx) {}
    }
}
