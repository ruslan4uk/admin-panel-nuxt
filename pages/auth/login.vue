<template>
<section class="register mt-5">
    <sui-container>
        <sui-grid divided centered>
            <sui-grid-row stretched>
                <sui-grid-column :mobile="16" :tablet="12" :computer="7">
                    <sui-segment>
                        <h3>Login</h3>
                        <sui-divider></sui-divider>
                        <sui-form @submit.prevent="login">
                            <sui-form-field :error="errors.email ? true : false">
                                <label>Email</label>
                                <input v-model="form.email" type="text" placeholder="Email">
                                <div class="invalid-feedback" v-if="errors.email">
                                    {{ errors.email }}
                                </div>
                            </sui-form-field>

                            <sui-form-field :error="errors.email ? true : false">
                                <label>Password</label>
                                <input v-model="form.password" type="text" placeholder="Email">
                            </sui-form-field>

                            <sui-form-field centered>
                                <sui-button fluid color="blue">Login</sui-button>
                            </sui-form-field>
                        </sui-form>
                    </sui-segment>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        
    </sui-container>
</section>


    <!-- <section class="register mt-5">
        <div class="container">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Login</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="form.email" type="text" class="form-control" :class="{ 'is-invalid' : errors.email }" placeholder="Email">
                                <div class="invalid-feedback" v-if="errors.email">
                                    {{ errors.email }}
                                </div>   
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input v-model="form.password" type="text" class="form-control" :class="{ 'is-invalid' : errors.password    }" placeholder="Password">
                                <div class="invalid-feedback" v-if="errors.password">
                                    {{ errors.password[0] }}
                                </div>   
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
     -->
</template>

<script>
    export default {
        auth: false,
        middleware: 'guest',
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                },
            }
        },
        methods: {
            async login() {                
                await this.$auth.login({ data: this.form });

                this.$router.push({name: 'index'});
            }
        },
    }
</script>

<style lang="sass" scoped>

</style>