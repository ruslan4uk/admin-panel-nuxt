<template>
    <section class="content mt-4">
        
        <sui-header size="huge"><nuxt-link to="/articles">Articles</nuxt-link> / Create or update new article</sui-header>
        <sui-divider hidden></sui-divider>

        <sui-divider></sui-divider>

        <sui-grid divided centered>
            <sui-grid-row>
                <sui-grid-column :mobile="16" :tablet="14" :computer="14">

                    <sui-form @submit.prevent="saveArticle">

                        <sui-form-field :error="errors.title ? true : false">
                            <label>Avatar</label>
                            <div class="article-avatar">
                                <label for="article-avatar" class="article-avatar__label" :style="{ 'background-image': 'url(' + avatar + ')' }"></label>
                                <input type="file" @change="uploadAvatar" ref="avatar" name="article-avatar" id="article-avatar" class="article-avatar__input" accept="image/*" />
                            </div>
                            <div class="invalid-feedback" v-if="errors.avatar">
                                {{ errors.avatar[0] }}
                            </div>
                        </sui-form-field>

                        <sui-form-field :error="errors.title ? true : false">
                            <label>Title</label>
                            <input placeholder="Title" v-model="form.title"  />
                            <div class="invalid-feedback" v-if="errors.title">
                                {{ errors.title[0] }}
                            </div>
                        </sui-form-field>
                        <sui-form-field :error="errors.country_id ? true : false">
                            <label>Country</label>
                            <sui-dropdown
                                fluid
                                :options="countries"
                                placeholder="Select Country"
                                search
                                selection
                                v-model="form.country_id"
                            />
                            <div class="invalid-feedback" v-if="errors.country_id">
                                {{ errors.country_id[0] }}
                            </div>
                        </sui-form-field>
                        <sui-form-field :error="errors.city_id ? true : false">
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
                                <div class="invalid-feedback" v-if="errors.text">
                                    {{ errors.text[0] }}
                                </div>
                            </no-ssr>
                        </sui-form-field>

                        <sui-divider></sui-divider>

                        <sui-form-field>
                            <sui-checkbox label="Active" v-model="form.active" />
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
import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                form: {
                    id: this.$route.params.id,
                    title: '',
                    text: '',
                    avatar: '',
                    country_id: null,
                    city_id: '',
                    active: true,
                },
                countries: [],
                cities: [],
                cityLoading: false,
                cityDisabled: true,               
                
            }
        },

        async fetch ({ store, params }) {            
            await store.dispatch('pages/articles/getArticles')  
            
        },

        asyncData ({ app, params }) {
            return app.$axios.get('/search/get-country')
                .then((res) => {
                    return { countries: res.data.data }
                })

            
        },

        computed: {
           avatar() {
               return this.form.avatar ? this.form.avatar.avatar : 'https://via.placeholder.com/1000x300'
           }
        },

        mounted() {
            if(this.$store.getters['pages/articles/article'](this.$route.params.id)) {
                this.form = Object.assign({}, this.$store.getters['pages/articles/article'](this.$route.params.id))
            }           
        },
        
        methods: {
            saveArticle(){
                this.$axios.post('/articles', this.form)
                    .then(response => {
                        this.$toast.success('Update successfully')
                    })
            },

            uploadAvatar() {
                var formData = new FormData
                formData.append('avatar', this.$refs.avatar.files[0])
                formData.append('page_id', this.$route.params.id)
                this.$axios.$post('/articles/upload-avatar', formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(response => {
                    this.form.avatar = response.data
                })
            },

            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append("file", file);
                formData.append('page_id', this.$route.params.id)
                this.$axios({
                    url: "/articles/upload",
                    method: "POST",
                    data: formData
                }).then(response => {
                    console.log(response.data.file);
                    
                    let url = response.data.file; // Get url from response
                    Editor.insertEmbed(cursorLocation, "image", url);
                    resetUploader();
                    })
                    .catch(err => {
                    this.$toast.error('Неправильный формат изображения')
                });
            },

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

<style lang="sass" scoped>
.article-avatar
    &__label
        display: block
        width: 100%
        height: 20rem
        border-radius: 25px
        border: 2px solid #4183c4
        cursor: pointer
        background-size: cover
        background-position: center center
    &__input
        position: absolute
        left: -9999px
</style>