export default {
    namespaced: true,

    state() {
        return {
            categories: {}
        }
    },

    getters: {
        categories(state) {
            return state.categories
        }
    },

    mutations: {
        SET_CATEGORIES(state, payload) {
            state.categories = payload
        },
        ADD_CATEGORIES(state, payload) {
            state.categories.push(payload);
        },
        REMOVE_CATEGORIES(state, payload) {
            state.categories.splice(payload, 1);
        },
    },

    actions: {
        async getCategories ({ commit }) {
            await this.$axios.$get('settings/categories')
            .then((res) => {
                commit('SET_CATEGORIES', res.data)
            })
        },

        createCategories({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.post('/settings/categories', payload).then(() => {
                    dispatch('getCategories')
                    resolve()
                })
            })   
        },

        removeCategories({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.delete('/settings/categories/' + payload.id).then(() => {
                    commit('REMOVE_CATEGORIES', payload.index)
                    resolve()
                })
            })   
        }
    }
}