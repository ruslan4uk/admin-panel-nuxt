<template>
    <section class="register mt-5">
        <div class="container">
            <div class="col-md-6 offset-md-3">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0">Register</h5>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="register">
                            <div class="form-group">
                                <label>Name</label>
                                <input v-model="form.name" type="text" class="form-control" :class="{ 'is-invalid' : errors.name }" placeholder="Name">
                                <div class="invalid-feedback" v-if="errors.name">
                                    {{ errors.name[0] }}
                                </div>                                
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input v-model="form.email" type="text" class="form-control" :class="{ 'is-invalid' : errors.email }" placeholder="Email">
                                <div class="invalid-feedback" v-if="errors.email">
                                    {{ errors.email[0] }}
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
                                <button type="submit" class="btn btn-primary w-100">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        middleware: 'guest',
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                }
            }
        },
        methods: {
            async register() {                
                await this.$axios.post('/auth/register', this.form)

                this.$auth.login({data: this.form});

                this.$router.push({name: 'index'});
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>