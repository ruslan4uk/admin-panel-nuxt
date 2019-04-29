<template>
    <section class="content mt-4">
        
        <sui-header size="huge">Articles</sui-header>
        <sui-divider hidden></sui-divider>

        <sui-table striped hover>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>Title</sui-table-header-cell>
                    <sui-table-header-cell>Active</sui-table-header-cell>
                    <sui-table-header-cell text-align="right">Actions</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>
            <sui-table-body>
                <sui-table-row v-for="(article,index) in articles.data" :key="index">
                    <sui-table-cell>{{ article.title }}</sui-table-cell>
                    <sui-table-cell>{{ article.active ? 'Yes' : 'No' }}</sui-table-cell>
                    <sui-table-cell text-align="right">
                        <sui-button icon="left edit" circular color="blue" size="tiny" />
                        <confirm-delete icon="right delete" circular color="red" size="tiny" :currentId="article.id" :currentIndex="index"></confirm-delete>
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <sui-divider></sui-divider>

        <paginate :data="articles" offsets="2"  @currentPage="currentPage" />

        <nuxt-link to="/articles/new">
            <sui-button circular icon="add" content="Add" size="mini" color="green" />
        </nuxt-link>
        
        
    </section>
</template>

<script>
import ConfirmDelete from '@/layouts/partials/ConfirmDelete'
import Paginate from '@/layouts/partials/Paginate'
import { mapGetters } from 'vuex';

    export default {
        components: { Paginate, ConfirmDelete },
        data() {
            return {
                
            }
        },

        async fetch ({ store, params }) {            
            await store.dispatch('pages/articles/getArticles')
        },

        computed: {
            ...mapGetters({
                articles: 'pages/articles/articles'
            }),
        },

        methods: {
            currentPage(page) {
                this.$store.dispatch('pages/articles/getArticles', page);
            },

        }

    }
</script>

<style lang="scss" scoped>

</style>