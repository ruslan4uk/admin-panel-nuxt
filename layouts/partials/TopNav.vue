<template>
<div>
    <!-- <sui-menu inverted fixed class="header-navigation">
        <sui-container>
            <sui-menu-item header>EG</sui-menu-item>
            <nuxt-link v-if="authenticated" to="/" class="item">Dashboard</nuxt-link>
            <nuxt-link v-if="authenticated" to="/settings" class="item">Settings</nuxt-link>
            <sui-menu-menu position="right">
                <template v-if="authenticated">
                    <a @click.prevent="logOut" class="item">Logout</a>
                </template>
                <template v-else>
                    <nuxt-link class="item" to="/auth/login">Login</nuxt-link>
                </template>
            </sui-menu-menu>

        </sui-container>
    </sui-menu> -->

    <sui-sidebar visible size="wide" class="vertical inverted labeled icon menu header-navigation">
        <sui-menu-item header>EG</sui-menu-item>
        <nuxt-link v-if="authenticated" to="/" exact class="item"><i class="home icon"></i>Dashboard</nuxt-link>
        <nuxt-link v-if="authenticated" to="/articles" class="item"><i class="file icon"></i>Articles</nuxt-link>
        <nuxt-link v-if="authenticated" to="/tours" class="item"><i class="database icon"></i>Tours</nuxt-link>
        <nuxt-link v-if="authenticated" to="/guides" class="item"><i class="user icon"></i>Guides</nuxt-link>
        <nuxt-link v-if="authenticated" to="/comments" class="item"><i class="envelope open
 icon"></i>Comments</nuxt-link>
        <nuxt-link v-if="authenticated" to="/settings" class="item"><i class="cogs icon"></i>Settings</nuxt-link>

        <template v-if="authenticated">
            <a href="" @click.prevent="logOut" class="item">Logout</a>
        </template>
        <template v-else>
            <nuxt-link class="item" to="/auth/login">Login</nuxt-link>
        </template>
        
    </sui-sidebar>

</div>
    <!-- <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-container>
            <nuxt-link to="/" class="navbar-brand">EG Admin Panel</nuxt-link>
            
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <li class="nav-item" v-if="authenticated">
                        <nuxt-link class="nav-link" to="/">Dashboard</nuxt-link>
                    </li>
                    <li class="nav-item" v-if="authenticated">
                        <nuxt-link class="nav-link" to="/settings">Settings</nuxt-link>
                    </li>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <template v-if="authenticated">
                        <b-nav-item-dropdown right>
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
  </b-navbar> -->
  
</template>

<script>
    export default {
        
        methods: {
            logOut() {
                this.$auth.logout();
                this.$router.push({name: 'index'})
            }
        }
        
    };
</script>
<style lang="sass" scoped>
.ui.header-navigation
    font-size: 0.75rem 

.ui.header-navigation .header 
    font-size: 1rem
</style>