export default {
    namespaced: true,

    state() {
        return {
            languages: {}
        }
    },

    getters: {
        languages(state) {
            return state.languages
        }
    },

    mutations: {
        SET_LANGUAGES(state, payload) {
            state.languages = payload
        },
        ADD_LANGUAGES(state, payload) {
            state.languages.push(payload);
        },
        REMOVE_LANGUAGES(state, payload) {
            state.languages.splice(payload, 1);
        },
    },

    actions: {
        async getLanguages ({ commit }) {
            await this.$axios.$get('settings/languages')
            .then((res) => {
                commit('SET_LANGUAGES', res.data)
            })
        },

        createLanguages({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.post('/settings/languages', payload).then(() => {
                    dispatch('getLanguages')
                    resolve()
                })
            })   
        },

        removeLanguages({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.delete('/settings/languages/' + payload.id).then(() => {
                    commit('REMOVE_LANGUAGES', payload.index)
                    resolve()
                })
            })   
        }
    }
}