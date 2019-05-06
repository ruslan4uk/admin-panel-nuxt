<template>
     <section class="content mt-4">
        
        <sui-header size="huge">Comments</sui-header>
        <sui-divider hidden></sui-divider>

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
                        <sui-button icon="left comment outline" circular color="blue" size="tiny" @click="openModal(comment, index)" />
                        <confirm-delete icon="right delete" circular color="red" size="tiny" 
                            :currentId="comment.id" 
                            :currentIndex="index"
                            @delete="removeComment(comment.id, index)">
                        </confirm-delete>
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <sui-divider></sui-divider>

        <paginate :data="comments" offsets="2"  @currentPage="currentPage" />

        <sui-modal v-model="open">
            <sui-modal-header>View comment</sui-modal-header>
            <sui-modal-content scrolling>
                <sui-grid>
                    <sui-grid-row>
                        <sui-grid-column :width="4">
                            <sui-image size="medium" 
                                v-if="modalContent && modalContent.user_data" 
                                :src="'http://localhost:8000' + modalContent.user_data.avatar" />
                        </sui-grid-column>
                        <sui-grid-column :width="12">
                            <sui-header v-if="modalContent && modalContent.page_user">
                                {{ modalContent.page_user.name }} ({{ modalContent.page_user.email }})
                            </sui-header>
                            <sui-divider></sui-divider>
                            {{ modalContent.text }}
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button negative @click="unpublicComment" v-if="modalContent.active === 1">Снять с публикации</sui-button>
                <sui-button positive @click="publicComment" v-if="modalContent.active === 0">Опубликовать</sui-button>
                <sui-button negative @click="open = !open">Закрыть</sui-button>
            </sui-modal-actions>
        </sui-modal>
        
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
            open: false,
            modalContent: {},
            modalContentIndex: ''
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

        openModal(comment, index) {
            this.modalContent = comment
            this.modalContentIndex = index
            this.open = true
        },

        publicComment() {
            this.$axios.post('/comments/', {active: 1, id: this.modalContent.id}).then(response => {
                this.$store.dispatch('pages/comments/publicComment', {index: this.modalContentIndex, active: 1});
                this.$toast.success('Update successfully')
                this.open = false
            })
        },

        unpublicComment() {
            this.$axios.post('/comments/', {active: 0, id: this.modalContent.id}).then(response => {
                this.$store.dispatch('pages/comments/publicComment', {index: this.modalContentIndex, active: 0});
                this.$toast.success('Update successfully')
                this.open = false
            })
        },

        removeComment(id,index) {
            this.$store.dispatch('pages/comments/removeComment', {id,index}).then(() => {
                this.$toast.success('Delete successfully')
            })
        }
    },
}
</script>

<style scoped lang="sass">
.comment-avatar
    width: 100px !important
    border-radius: 25px !important
</style>