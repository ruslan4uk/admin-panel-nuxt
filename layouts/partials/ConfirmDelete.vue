<template>
    <span>
        <sui-button :icon="icon" circular :color="color" :size="size" @click="confirm" />
        <sui-modal v-model="visible" size="mini">
            <sui-modal-content imge>
                <sui-header>Delete?</sui-header>
            </sui-modal-content>
            <sui-modal-actions>
                <sui-button positive size="tiny" @click.native="visible = !visible">No</sui-button>
                <sui-button negative size="tiny" @click.native="emit">Yes</sui-button>
            </sui-modal-actions>
        </sui-modal>
    </span>
</template>

<script>
    export default {
        props: ['currentId', 'currentIndex', 'color', 'icon', 'size'],
        data() {
            return {
                visible: false
            }
        },

        methods: {
            confirm() {
                this.visible = !this.visible
            },
            emit() {
                this.confirm()
                this.$emit('delete')//, [this.currentId, this.currentIndex])
            }
        }

    }
</script>

<style lang="sass" scoped>

</style>