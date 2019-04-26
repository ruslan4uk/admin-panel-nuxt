export default {
    namespaced: true,

    state() {
        return {
            btn_loading: false,
        }
    },

    getters: {
        loading(state) {
            return state.btn_loading
        }
    },

    mutations: {
        SET_LOADING(state, payload) {
            state.btn_loading = payload;
        },
    },

    actions: {
        setLoading({ commit }, payload) {
            commit('SET_LOADING', payload);
        },
        deleteLoading({ commit }) {
            commit('SET_LOADING', false);
        },
    },
}


// import Vue from 'vue'
// import Vuex from 'vuex'

// import validation from './validation'

// Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'


// export const store = new Vuex.Store({
//     modules: {
//         validation,
//     },

    

//     strict: debug,
// })