export default {
    namespaced: true,

    store() {
        return {
            articles: {},
            paginate: {},
        }
    },

    getters: {
        articles(state) {
            return state.articles
        },
        paginate(state) {
            return state.paginate
        }
    },

    mutations: {
        SET_ARTICLES(state, payload) {
            state.articles = payload
        },
    },

    actions: {
        async getArticles ({ commit }, page) {
            console.log(page)
            if (page && page !== 'Undefined') {
                page = '?page=' + page
            } else {
                page = ''
            }
                
            await this.$axios.$get('/articles' + page)
            .then((res) => {
                commit('SET_ARTICLES', res.data)
            })
        },
    }

}