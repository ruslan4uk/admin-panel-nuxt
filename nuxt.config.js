
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
     * Load plugins
     */
    plugins: [
      { src: '~plugins/vue-editor', ssr: false },
      './plugins/mixins/validation',
      './plugins/mixins/user',
      './plugins/axios',
      
    ],

    /**
     * Customize the progress bar color
     */
    loading: {
        color: '#2185d0',
        height: '5px',
    },


    /**
     * Route
     */
    router: {
        linkActiveClass: 'active',
        middleware: [
            'clearValidationErrors', 'auth'
        ]
    },

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
      plugins: [
        '~/plugins/axios'
      ],
        strategies: {
            local: {
              endpoints: {
                login: {
                  url: 'auth/login', method: 'post', propertyName: 'token.access_token'
                },
                user: {
                  url: 'auth/me', method: 'post', propertyName: 'data'
                },
                logout: {
                  url: 'auth/logout', method: 'post'
                },
                refresh: {
                  url: 'auth/refresh',
                  method: 'post',
                  token: 'access_token',
                  expiresIn: 'expires_in'
                },
              },
              tokenRequired: true,
              tokenType: 'Bearer',
              refreshToken: true
            }
          },
          redirect: {
            login: '/auth/login',
            logout: '/auth/login',
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
        '@nuxtjs/toast',
        //'bootstrap-vue/nuxt',
        'semantic-ui-vue/nuxt', // includes styles from semantic-ui-css
        //['semantic-ui-vue/nuxt', {css: false}] // if you have your own semantic-ui styles
    ],

    /**
     * Axios config
     */
    axios: {
        baseURL: 'http://localhost:8000/api/v2',
    },

    /**
     * Toast
     */
    toast: {
      theme: "outline", 
      position: "bottom-right", 
      duration : 5000,
      register: [ // Register custom toasts
        {
          name: 'my-error',
          message: 'Oops...Something went wrong',
          options: {
            type: 'error'
          }
        }
      ]
    },

    /**
     * Build configuration
     */
    build: {
        /**
         * Run ESLint on save
         */
        vendor: ['vue2-editor'],
        extractCSS: true,
        extend(config, ctx) {},
        
    }
}
