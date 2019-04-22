import Vue from 'vue'
import Vuex from 'vuex'

import validation from './validation'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


export const store = new Vuex.Store({
    modules: {
        validation,
    },

    getters: {},

    mutations: {},

    strict: debug,
})