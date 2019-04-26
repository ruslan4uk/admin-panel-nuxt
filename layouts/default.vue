<template>
    <div>
        <top-nav />        
        <sui-grid centered>
            <sui-grid-row>
                <sui-grid-column :mobile="16" :tablet="12" :computer="12">
                    <sui-divider hidden></sui-divider>
                    <nuxt/>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        
    </div>
</template>

<script>
import TopNav from './partials/TopNav'

export default {
    components: { 
        TopNav, 
    },
}
</script>