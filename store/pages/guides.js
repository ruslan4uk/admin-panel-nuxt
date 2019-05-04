export default {
    namespaced: true,

    store() {
        return {
            guides: {},
            guide: {},
        }
    },

    getters: {
        guides (state) {
            return state.guides;
        },
        guide (state) {
            return state.guide;
        }
    },

    mutations: {
        SET_GUIDES (state, payload) {
            state.guides = payload
        },

        SET_GUIDE (state, payload) {
            state.guide = payload
        }
    },

    actions: {
        async getGuides ({ commit }, page) {
            if (page && page !== 'Undefined') {
                page = '?page=' + page
            } else {
                page = ''
            }
                
            await this.$axios.$get('/guides' + page).then((res) => {
                commit('SET_GUIDES', res.data)
            })
        },

        async getGuide ({ commit }, id) {
            await this.$axios.$get('/guides/' + id).then(response => {
                commit('SET_GUIDE', response.data)
            })
        }
    }

}