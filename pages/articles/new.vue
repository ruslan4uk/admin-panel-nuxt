<template>
    <section class="content mt-4">
        
        <sui-header size="huge"><nuxt-link to="/articles">Articles</nuxt-link> / Create new article</sui-header>
        <sui-divider hidden></sui-divider>
        {{form}}

        <sui-grid divided>
            <sui-grid-row>
                <sui-grid-column :mobile="16" :tablet="10" :computer="10">

                    <sui-form>
                        <sui-form-field>
                            <label>Title</label>
                            <input placeholder="Title" v-model="form.title" />
                        </sui-form-field>
                        <sui-form-field>
                            <label>Country</label>
                            <sui-dropdown
                                fluid
                                :options="countries"
                                placeholder="Select Country"
                                search
                                selection
                                v-model="form.country_id"
                                @input="input"
                            />
                        </sui-form-field>
                        <sui-form-field>
                            <label>City</label>
                            <sui-dropdown
                                fluid
                                :options="cities"
                                placeholder="Select City"
                                search
                                selection
                                :loading="cityLoading"
                                :class="{ 'disabled' : cityDisabled}"
                                v-model="form.city_id"
                            />
                        </sui-form-field>

                        <sui-form-field>
                            <label>Text</label>
                            <no-ssr placeholder="Loading Your Editor...">
                                <vue-editor 
                                    placeholder="Write Something..." 
                                    v-model="form.text"
                                    useCustomImageHandler
                                    @imageAdded="handleImageAdded">
                                </vue-editor>
                            </no-ssr>
                        </sui-form-field>

                        <sui-divider></sui-divider>

                        <sui-form-field>
                            <sui-checkbox label="Active" />
                            </sui-form-field>
                        <sui-button type="submit" color="green" icon="icon save" circular>Save</sui-button>
                    </sui-form>
                    
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>

        

    </section>
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                form: {
                    id: '',
                    title: '',
                    text: '123',
                    country_id: null,
                    city_id: '',
                    active: '',
                },
                countries: [],
                cities: [],
                cityLoading: false,
                cityDisabled: true,               
                
            }
        },

        asyncData ({ app, params }) {
            return app.$axios.get('/search/get-country')
                .then((res) => {
                    return { countries: res.data.data }
                })
        },

        computed: {
           
        },
        
        methods: {
            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append("file", file);

                this.$axios({
                    url: "/articles/upload",
                    method: "POST",
                    data: formData
                }).then(result => {
                    let url = result.data.file; // Get url from response
                    Editor.insertEmbed(cursorLocation, "image", url);
                    resetUploader();
                    })
                    .catch(err => {
                    console.log(err);
                });
            },

            input(target) {
                console.log('Target ', target);
                
            }
        },

        watch: {
            'form.country_id': function (newVal, oldVal){
                this.cityLoading = true
                this.$axios.get('/search/get-city?q=' + newVal).then(res => {
                    this.cities = res.data.data
                    this.cityLoading = false
                    this.cityDisabled = false
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>