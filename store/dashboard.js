export default {
    namespaced: true,

    state() {
        return {
            dashboard: {},
        }
    },

    getters: {
        dashboard(state) {
            return state.dashboard
        }
    },

    mutations: {
        SET_DASHBOADR(state, payload) {
            state.dashboard = payload
        }
    },

    actions: {
        async loadStuff ({commit}) {
            const data = await this.$axios.$get('dashboard/index')
            commit('SET_DASHBOADR', data)
        }
    }

}