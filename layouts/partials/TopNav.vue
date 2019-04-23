<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-container>
            <nuxt-link to="/" class="navbar-brand">EG Admin Panel</nuxt-link>
            
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <li class="nav-item" v-if="authenticated">
                        <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
                    </li>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    
                    <template v-if="authenticated">
                        <b-nav-item-dropdown right>
                            <!-- Using 'button-content' slot -->
                            <template slot="button-content">{{ user.name }} &nbsp;</template>
                            <b-dropdown-item @click.prevent="logOut">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/auth/login">Login</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/auth/register">Register</nuxt-link>
                        </li>
                    </template>
                    
                </b-navbar-nav>
            </b-collapse>
        </b-container>
  </b-navbar>
</template>

<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
            logOut() {
                this.$auth.logout();
                this.$router.push({name: 'index'})
            }
        }
        
    };
</script>
<style>
</style>