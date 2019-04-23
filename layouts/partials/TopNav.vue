<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <nuxt-link to="/" class="navbar-brand">EG Admin Panel</nuxt-link>
            <!-- <a class="navbar-brand" href="#">EG Admin Panel</a> -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <template v-if="authenticated">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{user.name}}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/auth/login">Login</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/auth/register">Register</nuxt-link>
                        </li>
                    </template>
                    
                </ul>
            </div>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    
};
</script>

<style lang="scss" scoped>

</style>