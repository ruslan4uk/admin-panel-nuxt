<template>
    <section class="dashboard mt-4">
        <sui-header size="huge">Dashboard</sui-header>
        <sui-divider hidden></sui-divider>

        <sui-segment>
            <sui-grid divided centered>
                <sui-grid-row stretched>
                    <sui-grid-column :mobile="16" :tablet="12" :computer="5">
                        <sui-statistic in-group size="small">
                            <sui-statistic-value>{{ dashboard.guideCount }}</sui-statistic-value>
                            <sui-statistic-label>Колличество гидов</sui-statistic-label>
                        </sui-statistic>
                    </sui-grid-column>
                    <sui-grid-column :mobile="16" :tablet="12" :computer="5">
                        <sui-statistic in-group size="small">
                            <sui-statistic-value>{{ dashboard.tourCount }}</sui-statistic-value>
                            <sui-statistic-label>Колличество туров</sui-statistic-label>
                        </sui-statistic>
                    </sui-grid-column>
                    <sui-grid-column :mobile="16" :tablet="12" :computer="5">
                        <sui-statistic in-group size="small">
                            <sui-statistic-value>{{ dashboard.commentCount }}</sui-statistic-value>
                            <sui-statistic-label>Колличество комментариев</sui-statistic-label>
                        </sui-statistic>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-segment>
        
        <sui-divider hidden></sui-divider>

        <sui-header size="medium">Last 10 guides</sui-header>

        <sui-table striped hover>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>Name</sui-table-header-cell>
                    <sui-table-header-cell>E-mail</sui-table-header-cell>
                    <sui-table-header-cell>Date register</sui-table-header-cell>
                    <sui-table-header-cell>Status</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>
            <sui-table-body>
                <sui-table-row v-for="(user,index) in dashboard.firstUser" :key="index">
                    <sui-table-cell>{{ user.name }}</sui-table-cell>
                    <sui-table-cell>{{ user.email }}</sui-table-cell>
                    <sui-table-cell>{{ user.created_at }}</sui-table-cell>
                    <sui-table-cell>{{statusUser(user)}}</sui-table-cell>
                </sui-table-row>
            </sui-table-body>
        </sui-table>

        <sui-divider></sui-divider>

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
        },
        methods: {
            statusUser(user) {
                if(user.user_data) {
                    return user.user_data.status == 0 ? 'Не активен' : 'Активен'
                }
            }
        }

    }
</script>

<style lang="sass" scoped>

</style>