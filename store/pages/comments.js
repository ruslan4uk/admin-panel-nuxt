export default {
    namespace: true,

    store() {
        return {
            comments: {}
        }
    },

    getters: {
        comments (state) {
            return state.comments
        }
    },

    mutations: {
        SET_COMMENTS (state, payload) {
            state.comments = payload
        }
    },

    actions: {
        async getComments({ commit }, page) {
            if (page && page !== 'Undefined') {
                page = '?page=' + page
            } else {
                page = ''
            }

            await this.$axios.get('/comments' + page).then(response => {
                console.log(response.data.data);
                
                commit('SET_COMMENTS', response.data.data)
            })
        }
    }

}