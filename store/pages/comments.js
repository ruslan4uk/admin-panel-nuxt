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
        },

        CHANGE_STATUS (state, payload) {
            state.comments.data[payload.index].active = payload.active
        },
        REMOVE_COMMENT(state, payload) {
            state.comments.data.splice(payload, 1);
        },
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
        },

        async publicComment ({ commit }, payload) {
            commit('CHANGE_STATUS', payload);
        },

        removeComment({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.delete('/comments/' + payload.id).then(() => {
                    commit('REMOVE_COMMENT', payload.index)
                    resolve()
                })
            })   
        }

    }

}