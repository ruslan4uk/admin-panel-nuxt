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
                    <sui-header size="medium">Categories</sui-header>
                    <sui-divider></sui-divider>
                    <!-- <sui-message>
                        <sui-message-header>Внимание</sui-message-header>
                        <p>Важно соблюдать правильный iso код языка</p>
                    </sui-message> 
                    <sui-divider></sui-divider> -->

                    <sui-table striped hover>
                        <sui-table-header>
                            <sui-table-row>
                                <sui-table-header-cell>Categories</sui-table-header-cell>
                                <sui-table-header-cell>Active</sui-table-header-cell>
                                <sui-table-header-cell text-align="right">Actions</sui-table-header-cell>
                            </sui-table-row>
                        </sui-table-header>
                        <sui-table-body>
                            <sui-table-row v-for="(category,index) in categories" :key="index">
                                <sui-table-cell>{{ category.title }}</sui-table-cell>
                                <sui-table-cell>{{ category.active ? 'Yes' : 'No' }}</sui-table-cell>
                                <sui-table-cell text-align="right">
                                    <sui-dropdown text="Edit" class="dropdown-small" button floating>
                                        <sui-dropdown-menu>
                                            <sui-dropdown-item @click="editCategories(index)"><sui-icon name="edit" />Edit</sui-dropdown-item>
                                            <sui-dropdown-item @click="removeCategories(category.id, index)"><sui-icon name="delete"/>Remove</sui-dropdown-item>
                                        </sui-dropdown-menu>
                                    </sui-dropdown>
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>

                    <sui-button circular icon="add" @click.native="addCategories" content="Add" size="mini" />

                </sui-grid-column>
            </sui-grid-row>

            
        </sui-grid>


        <!-- Add languages -->
        <sui-modal v-model="addCategoriesToogle" size="tiny">
            <sui-header size="tiny">Add categories</sui-header>
            <sui-modal-content>
                <sui-modal-description>

                    <sui-form @submit.prevent="createCategories">
                        <sui-form-field :error="errors.name ? true : false">
                            <label>Name categories</label>
                            <input v-model="form.title" type="text" placeholder="Name categories">
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
import LeftNav from '~/layouts/partials/settings/LeftNav'
import { mapGetters, mapActions } from 'vuex';

    export default {
        middleware: 'auth',

        components: { LeftNav },

        data() {
            return {
                addCategoriesToogle: false,
                form: {
                    id: '',
                    title: '',
                    active: false
                }
            }
        },

        async fetch ({ store, params }) {            
            await store.dispatch('settings/categories/getCategories')
        },

        computed: {
            ...mapGetters({
                categories: 'settings/categories/categories'
            })
        },

        methods: {
            addCategories() {
                this.addCategoriesToogle = !this.addCategoriesToogle;
                this.form.id = ''
                this.form.title = ''
            },

            createCategories() {
                this.$store.dispatch('settings/categories/createCategories', this.form).then(() => {
                    this.addCategoriesToogle = false
                    this.$toast.success('Save successfully')
                })
            },

            editCategories(index) {
                this.addCategoriesToogle = !this.addCategoriesToogle;
                let find = this.categories.find((elem, i, arr) => arr.indexOf(elem) === index);
                this.form.id = Object.assign(find).id
                this.form.title = Object.assign(find).title
                this.form.active = Object.assign(find).active
            },

            removeCategories(id,index) {
                this.$store.dispatch('settings/categories/removeCategories', {id,index}).then(() => {
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