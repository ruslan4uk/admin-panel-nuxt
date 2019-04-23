
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
     * Css
     */
    css: [ 
        //'./node_modules/bootstrap/dist/css/bootstrap.min.css',
        '~assets/sass/app.sass',
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
                },
                // dashboard: {
                //     url: 'dashboard/index', method: 'get', propertyName: 'data'
                // }
              }
            }
          },
          redirect: {
            logout: '/auth/login',
            login: '/auth/login',
            home: '/auth/login'
          },
    },

    /**
     * Load modules
     */
    modules: [
        // Simple usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        'bootstrap-vue/nuxt',
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
        extend(config, ctx) {},
        
    }
}
