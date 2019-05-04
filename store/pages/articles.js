export default {
    namespaced: true,

    store() {
        return {
            articles: {},
            //paginate: {},
        }
    },

    getters: {
        articles(state) {
            return state.articles
        },
        // article(state, payload) {
        //     return state.articles.data[payload]
        // },
        article: (state) => (id) => {
            return state.articles.data.find(x => x.id == id);
            //return state.articles
        },
        paginate(state) {
            return state.paginate
        }
    },

    mutations: {
        SET_ARTICLES(state, payload) {
            state.articles = payload
        },
        REMOVE_ARTICLES(state, payload) {
            state.articles.data.splice(payload, 1);
        },
    },

    actions: {
        async getArticles ({ commit }, page) {
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

        getArticle ({ commit }, payload) {

        },

        removeArticles({ commit, dispatch }, payload ) {
            return new Promise((resolve, reject) => {
                this.$axios.delete('/articles/' + payload.id).then(() => {
                    commit('REMOVE_ARTICLES', payload.index)
                    resolve()
                })
            })   
        }
    }

}