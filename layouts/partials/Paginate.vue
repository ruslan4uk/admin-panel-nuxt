<template>
    <sui-button-group size="tiny" v-if="paginate.total > paginate.per_page">
        <sui-button icon="left chevron" color="grey" v-if="paginate.current_page > 1" @click.prevent="changePage(paginate.current_page - 1)" />
        <sui-button @click.prevent="changePage(page)" v-for="(page,index) in pagesNumber" :key="index" :class="{'active': page == paginate.current_page}">{{page}}</sui-button>
        <sui-button icon="right chevron" color="grey" v-if="paginate.current_page < paginate.last_page" @click.prevent="changePage(paginate.current_page + 1)"/>
    </sui-button-group>
</template>

<script>
    export default {
        props: ['data', 'offsets'],
        data() {
            return {
                offset: this.offsets || 1,
                paginate: Object.assign({}, this.data)
            }
        },

        computed: {
            pagesNumber() {
                if (!this.paginate.to) {
                    return [];
                }
                let from = this.paginate.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.paginate.last_page) {
                    to = this.paginate.last_page;
                }
                let pagesArray = [];
                for (let page = from; page <= to; page++) {
                    pagesArray.push(Number(page));
                }
                return pagesArray;
            }
        },

        methods : {
            changePage(page) {
                this.paginate.current_page = page;
                this.$emit('currentPage', page);
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>