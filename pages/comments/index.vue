<template>
     <section class="content mt-4">
        
        <sui-header size="huge">Comments</sui-header>
        <sui-divider hidden></sui-divider>

{{ comments.data }}

        <sui-table striped hover>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>Page</sui-table-header-cell>
                    <sui-table-header-cell>User</sui-table-header-cell>
                    <sui-table-header-cell>Active</sui-table-header-cell>
                    <sui-table-header-cell text-align="right">Actions</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>
            <sui-table-body>
                <sui-table-row v-for="(comment, index) in comments.data" :key="index">
                    <sui-table-cell>{{ comment.page_user.name }}</sui-table-cell>
                    <sui-table-cell>
                        <sui-image :src="'http://localhost:8000' + comment.user_data.avatar" avatar />
                        <span>{{ comment.user.name }}</span>
                    </sui-table-cell>
                    <sui-table-cell>{{ comment.active ? 'Yes' : 'No' }}</sui-table-cell>
                    <sui-table-cell text-align="right">
                        <nuxt-link :to="'/comments/' + comment.id">
                            <sui-button icon="left edit" circular color="blue" size="tiny" />
                        </nuxt-link>
                        <confirm-delete icon="right delete" circular color="red" size="tiny" 
                            :currentId="comment.id" 
                            :currentIndex="index"
                            @delete="removeComments(comment.id, index)">
                        </confirm-delete>
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <sui-divider></sui-divider>

        <paginate :data="comments" offsets="2"  @currentPage="currentPage" />
        
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ConfirmDelete from '@/layouts/partials/ConfirmDelete'
import Paginate from '@/layouts/partials/Paginate'

export default {
    components: { Paginate, ConfirmDelete },
    data() {
        return {
  
        }
    },

    async fetch ({ store, params }) {            
        await store.dispatch('pages/comments/getComments')
    },

    computed: {
        ...mapGetters({
            comments: 'pages/comments/comments'
        })
    },

    methods: {
        currentPage(page) {
            this.$store.dispatch('pages/comments/getComments', page);
        },

        removeComments(id, index) {

        }
    },
}
</script>

<style scoped>

</style>