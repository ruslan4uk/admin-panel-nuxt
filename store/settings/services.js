export default {
    namespaced: true,

    state() {
        return {
            services: {}
        }
    },

    getters: {
        services(state) {
            return state.services
        }
    },

    mutations: {
        SET_SERVICES(state, payload) {
            state.services = payload
        },
        ADD_SERVICES(state, payload) {
            state.services.push(payload);
        },
        REMOVE_SERVICES(state, payload) {
            state.services.splice(payload, 1);
        },
    },

    actions: {
        async getServices ({ commit }) {
            await this.$axios.$get('settings/services')
            .then((res) => {
                commit('SET_SERVICES', res.data)
            })
        },

        createServices({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.post('/settings/services', payload).then(() => {
                    dispatch('getServices')
                    resolve()
                })
            })   
        },

        removeServices({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.delete('/settings/services/' + payload.id).then(() => {
                    commit('REMOVE_SERVICES', payload.index)
                    resolve()
                })
            })   
        }
    }
}