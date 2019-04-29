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
                    <sui-header size="medium">Languages</sui-header>
                    <sui-divider></sui-divider>
                    <sui-message icon="envelope outline">
                        <sui-message-header>Внимание</sui-message-header>
                        <p>Важно соблюдать правильный iso код языка</p>
                    </sui-message>
                    <sui-divider></sui-divider>

                    <sui-table striped hover>
                        <sui-table-header>
                            <sui-table-row>
                                <sui-table-header-cell>Language</sui-table-header-cell>
                                <sui-table-header-cell>iso-code</sui-table-header-cell>
                                <sui-table-header-cell>Active</sui-table-header-cell>
                                <sui-table-header-cell text-align="right">Actions</sui-table-header-cell>
                            </sui-table-row>
                        </sui-table-header>
                        <sui-table-body>
                            <sui-table-row v-for="(language,index) in languages" :key="index">
                                <sui-table-cell>{{ language.name }}</sui-table-cell>
                                <sui-table-cell>{{ language.iso_code }}</sui-table-cell>
                                <sui-table-cell>{{ language.active ? 'Yes' : 'No' }}</sui-table-cell>
                                <sui-table-cell text-align="right">
                                    <sui-button icon="left edit" circular color="blue" size="tiny" @click="editLanguages(index)" />
                                    <confirm-delete icon="right delete" circular color="red" size="tiny" 
                                                :currentId="language.id" 
                                                :currentIndex="index" 
                                                @delete="removeLanguages(language.id, index)">
                                    </confirm-delete>
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>

                    <sui-button circular icon="add" @click.native="addLanguages" content="Add" size="mini" color="green" />

                </sui-grid-column>
            </sui-grid-row>

            
        </sui-grid>


        <!-- Add languages -->
        <sui-modal v-model="addLanguagesToogle" size="tiny">
            <sui-header size="tiny">Add languages</sui-header>
            <sui-modal-content>
                <sui-modal-description>

                    <sui-form @submit.prevent="createLanguages">
                        <sui-form-field :error="errors.name ? true : false">
                            <label>Name language</label>
                            <input v-model="form.name" type="text" placeholder="Name language">
                            <div class="invalid-feedback" v-if="errors.name">
                                {{ errors.name[0] }}
                            </div>
                        </sui-form-field>

                        <sui-form-field :error="errors.iso_code ? true : false">
                            <label>ISO Code language</label>
                            <input v-model="form.iso_code" type="text" placeholder="ISO Code language">
                            <div class="invalid-feedback" v-if="errors.iso_code">
                                {{ errors.iso_code[0] }}
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
                addLanguagesToogle: false,
                form: {
                    id: '',
                    name: '',
                    iso_code: '',
                    active: false
                }
            }
        },

        async fetch ({ store, params }) {            
            await store.dispatch('settings/languages/getLanguages')
        },

        computed: {
            ...mapGetters({
                languages: 'settings/languages/languages'
            })
        },

        methods: {
            addLanguages() {
                this.addLanguagesToogle = !this.addLanguagesToogle;
                this.form.id = ''
                this.form.name = ''
                this.form.iso_code = ''
                this.$store.dispatch('validation/clearErrors');
            },

            createLanguages() {
                this.$store.dispatch('settings/languages/createLanguages', this.form).then(() => {
                    this.addLanguagesToogle = false
                    this.$toast.success('Save successfully')
                })
            },

            editLanguages(index) {
                this.addLanguagesToogle = !this.addLanguagesToogle;
                let find = this.languages.find((elem, i, arr) => arr.indexOf(elem) === index);
                this.form.id = Object.assign(find).id
                this.form.name = Object.assign(find).name
                this.form.iso_code = Object.assign(find).iso_code
                this.form.active = Object.assign(find).active
            },

            removeLanguages(id,index) {
                this.$store.dispatch('settings/languages/removeLanguages', {id,index}).then(() => {
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