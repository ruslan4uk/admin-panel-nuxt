<template>
    <section class="content mt-4">
        <div class="container">
            <h3>Welcome to dashbord</h3>
            <p>{{ dashboard.tourCount }}</p>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
    export default {
        middleware: 'auth',

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

</style>