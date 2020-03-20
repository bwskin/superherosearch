<template>
    <div>
        <SearchResult v-for="record in records" :record="record"/>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import SearchResult from "./SearchResult.vue"

export default Vue.extend({
    name: 'SearchResultsList',
    components: {
        SearchResult
    },
    data: () => ({
        
    }),
    props: ["records"]
})

</script>

<style>

</style>
