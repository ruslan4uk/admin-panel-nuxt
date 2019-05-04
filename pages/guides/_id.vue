<template>
    <section class="content mt-4">
        
        <sui-header size="huge">
            <nuxt-link to="/guides">Guides</nuxt-link> 
            / Guide ( {{ guide.name }} )</sui-header>
        <sui-divider hidden></sui-divider>

        {{ guide }}

        <sui-tab :menu="{ vertical: true, fluid: true, tabular: true }">
            <sui-tab-pane title="General information">
                <sui-item-group>
                    <sui-item>
                        <sui-item-image :src="'http://localhost:8000' + guide.user_data.avatar" />
                        <sui-item-content>
                            <sui-item-header>{{ guide.name }}</sui-item-header>
                            <sui-item-meta>
                                <p>{{ guide.email }}</p>
                                <p>Создан: {{ guide.created_at }}</p>
                                <p>Изменен: {{ guide.updated_at }}</p>
                            </sui-item-meta>
                        </sui-item-content>
                    </sui-item>
                </sui-item-group>

                <!-- Languages -->
                <h4>Languages</h4>
                <sui-label v-for="(language, index) in guide.languages" :key="index">
                    {{ language.name }}
                </sui-label>
                <sui-divider></sui-divider>

                <!-- Services -->
                <h4>Services</h4>
                <sui-label v-for="(service, index) in guide.services" :key="index">
                    {{ service.title }}
                </sui-label>
                <sui-divider></sui-divider>
                <h3>About</h3>
                <p>{{ guide.user_data.about }}</p>
            </sui-tab-pane>
            <sui-tab-pane title="Services">
                
            </sui-tab-pane>
            <sui-tab-pane title="License">
                Triangle
            </sui-tab-pane>
        </sui-tab>

    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {

        }
    },

    // async fetch ({ store, params }) {            
    //     await store.dispatch('pages/guides/getGuide')
    // },

    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        await store.dispatch('pages/guides/getGuide', route.params.id)
    },

    computed: {
        ...mapGetters({
            guide: 'pages/guides/guide'
        }),

    },
}
</script>

<style scoped lang="sass">

</style>