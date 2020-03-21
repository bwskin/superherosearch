<template>
    <b-tr>
        <b-td>
            {{ record.name }}
        </b-td>
        <b-td>
            {{ record.biography.publisher }}
        </b-td>
        <b-td>
            <b-button variant="outline-primary" @click="view(record)">VIEW</b-button>
        </b-td>
    </b-tr>
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
