<template>
    <b-row class="record-row">
        <b-col cols="7" offset="1">
            {{ record.name }}
        </b-col>
        <b-col cols="3">
            <b-button @click="view(record)">VIEW</b-button>
        </b-col>
    </b-row>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    name: 'SearchResult',
    data: () => ({
        
    }),
    props: ["record"],
    methods: {
        view(record) {
            this.$root.$emit('profileView', record)
        }
    }
})

</script>

<style>
    .record-row {
        padding: 5px;
    }
</style>
