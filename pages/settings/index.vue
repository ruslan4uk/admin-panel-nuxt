<template>
    <section class="content mt-4">
        
        <sui-header size="huge">Settings</sui-header>
        <sui-divider hidden></sui-divider>

        <sui-grid divided>
            <sui-grid-row>
                <sui-grid-column :mobile="16" :tablet="5" :computer="4">
                    <left-nav />
                </sui-grid-column>
                <sui-grid-column :mobile="16" :tablet="11" :computer="12">
                    <sui-header size="medium">General settings</sui-header>
                    <sui-divider></sui-divider>
                    <sui-message>
                        <sui-message-header>This page is development</sui-message-header>
                        <p>TODO: Generall settings</p>
                    </sui-message>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>

    </section>
</template>

<script>
import LeftNav from '~/layouts/partials/settings/LeftNav'
import { mapGetters, mapActions } from 'vuex';
    export default {
        middleware: 'auth',

        components: { LeftNav },

        data() {
            return {
                
            }
        },

        fetch ({ store, params, $axios }) {
            return $axios.$get('dashboard/index')
            .then((res) => {
                store.commit('dashboard/SET_DASHBOADR', res.data)
            })
        },

        computed: {
            ...mapGetters({
                dashboard: 'dashboard/dashboard'
            })
        }

    }
</script>

<style lang="sass" scoped>
.card-header 
    background: #006adc
.card-text 
    font-size: 2rem
</style>