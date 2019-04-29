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
                    <sui-header size="medium">Services</sui-header>
                    <sui-divider></sui-divider>
                    <!-- <sui-message>
                        <sui-message-header>Внимание</sui-message-header>
                        <p>Важно соблюдать правильный iso код языка</p>
                    </sui-message> 
                    <sui-divider></sui-divider> -->

                    <sui-table striped hover>
                        <sui-table-header>
                            <sui-table-row>
                                <sui-table-header-cell>Service</sui-table-header-cell>
                                <sui-table-header-cell>Active</sui-table-header-cell>
                                <sui-table-header-cell text-align="right">Actions</sui-table-header-cell>
                            </sui-table-row>
                        </sui-table-header>
                        <sui-table-body>
                            <sui-table-row v-for="(service,index) in services" :key="index">
                                <sui-table-cell>{{ service.title }}</sui-table-cell>
                                <sui-table-cell>{{ service.active ? 'Yes' : 'No' }}</sui-table-cell>
                                <sui-table-cell text-align="right">
                                    <sui-button icon="left edit" circular color="blue" size="tiny" @click="editServices(index)" />
                                    <confirm-delete icon="right delete" circular color="red" size="tiny" 
                                                :currentId="service.id" 
                                                :currentIndex="index" 
                                                @delete="removeServices(service.id, index)">
                                    </confirm-delete>
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>

                    <sui-button circular icon="add" @click.native="addServices" content="Add" size="mini" color="green" />

                </sui-grid-column>
            </sui-grid-row>

            
        </sui-grid>


        <!-- Add languages -->
        <sui-modal v-model="addServicesToogle" size="tiny">
            <sui-header size="tiny">Add services</sui-header>
            <sui-modal-content>
                <sui-modal-description>

                    <sui-form @submit.prevent="createServices">
                        <sui-form-field :error="errors.name ? true : false">
                            <label>Name service</label>
                            <input v-model="form.title" type="text" placeholder="Name services">
                            <div class="invalid-feedback" v-if="errors.title">
                                {{ errors.title[0] }}
                            </div>
                        </sui-form-field>

                        <sui-form-field>
                            <sui-checkbox v-model="form.active" label="Active" />
                        </sui-form-field>

                        <sui-form-field centered>
                            <sui-button fluid color="blue">Save</sui-button>
                        </sui-form-field>
                    </sui-form>

                </sui-modal-description>
            </sui-modal-content>
        </sui-modal>

        <sui-divider></sui-divider>

    </section>
</template>

<script>
import ConfirmDelete from '~/layouts/partials/ConfirmDelete'
import LeftNav from '~/layouts/partials/settings/LeftNav'
import { mapGetters, mapActions } from 'vuex';

    export default {
        middleware: 'auth',

        components: { LeftNav, ConfirmDelete },

        data() {
            return {
                addServicesToogle: false,
                form: {
                    id: '',
                    title: '',
                    active: false
                }
            }
        },

        async fetch ({ store, params }) {            
            await store.dispatch('settings/services/getServices')
        },

        computed: {
            ...mapGetters({
                services: 'settings/services/services'
            })
        },

        methods: {
            addServices() {
                this.addServicesToogle = !this.addServicesToogle;
                this.form.id = ''
                this.form.title = ''
            },

            createServices() {
                this.$store.dispatch('settings/services/createServices', this.form).then(() => {
                    this.addServicesToogle = false
                    this.$toast.success('Save successfully')
                })
            },

            editServices(index) {
                this.addServicesToogle = !this.addServicesToogle;
                let find = this.services.find((elem, i, arr) => arr.indexOf(elem) === index);
                this.form.id = Object.assign(find).id
                this.form.title = Object.assign(find).title
                this.form.active = Object.assign(find).active
            },

            removeServices(id,index) {
                this.$store.dispatch('settings/services/removeServices', {id,index}).then(() => {
                    this.$toast.success('Delete successfully')
                })
            }

        },

    }
</script>

<style lang="sass" scope>
.ui.button.dropdown-small
    font-size: 0.75rem
    & .menu>.item
        font-size: 0.75rem
</style>