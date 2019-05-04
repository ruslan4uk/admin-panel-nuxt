<template>
    <section class="content mt-4">
        
        <sui-header size="huge">Guides</sui-header>
        <sui-divider hidden></sui-divider>

        <sui-table striped hover>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>Name</sui-table-header-cell>
                    <sui-table-header-cell>Email</sui-table-header-cell>
                    <sui-table-header-cell>Active</sui-table-header-cell>
                    <sui-table-header-cell text-align="right">Actions</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>
            <sui-table-body>
                <sui-table-row v-for="(guide,index) in guides.data" :key="index">
                    <sui-table-cell>{{ guide.name }}</sui-table-cell>
                    <sui-table-cell>{{ guide.email }}</sui-table-cell>
                    <sui-table-cell>{{ guideActive(guide.user_data.active) }}</sui-table-cell>
                    <sui-table-cell text-align="right">
                        <nuxt-link :to="'/guides/' + guide.id">
                            <sui-button icon="left edit" circular color="blue" size="tiny" />
                        </nuxt-link>
                        <confirm-delete icon="right delete" circular color="red" size="tiny" 
                            :currentId="guide.id" 
                            :currentIndex="index"
                            @delete="removeGuides(guide.id, index)">
                        </confirm-delete>
                    </sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <sui-divider></sui-divider>

        <paginate :data="guides" offsets="2"  @currentPage="currentPage" />
        
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
        await store.dispatch('pages/guides/getGuides')
    },

    computed: {
        ...mapGetters({
            guides: 'pages/guides/guides'
        })
    },

    methods: {
        currentPage(page) {
            this.$store.dispatch('pages/guides/getGuides', page);
        },

        guideActive(active) {
            switch (active) {
                case '0':
                    return 'Профиль не заполнен'
                    break;
                case '1':
                    return 'Активен'
                    break;
                case '999':
                    return 'На модерации'
                    break;
                case '1000':
                    return 'Бан'
                    break;
                default:
                    break;
            }
        },

        removeGuides(id, index) {

        }
    },
}
</script>

<style scoped lang="sass">

</style>