<template>
    <div id="searchbar">
        <b-row>
            <b-col id="header">
                <h1>
                    Search your superhero!
                </h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="8" sm="7" offset-sm="1" md="6" offset-md="2">
                <b-form-input v-model="text" placeholder="Hero name..."></b-form-input>
            </b-col>
            <b-col cols="4" sm="3" md="2">
                <b-button v-on:click="search()">SEARCH!</b-button>
            </b-col>
        </b-row>
        <b-row v-if="status != 'init'">
            <b-col id="statusbar">
                <span v-if="status == 'searching'">searching...</span>
                <span v-if="status == 'completed'">Search complete and found {{records_number}} {{records_number > 1 || records_number === 0 ? "records" : "record"}}!</span>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import ApiService from "../services/api-service.ts"

export default Vue.extend({
    name: 'SearchBar',
    data: () => ({
        text: "",
        status: "init",
        records_number: 0,
    }),

    methods: {
        search: async function() {
            this.status = "searching"
            this.$emit('searching')
            const results = await ApiService.search(this.text)
            this.records_number = results ? results.length : 0
            this.$emit('gotResults', results)
            this.status = "completed"
        }
    }
})

</script>

<style>
    #searchbar {
        padding: 10px;
    }

    #header {
        text-align: center
    }

    #statusbar {
        text-align: center
    }

    .btn {
        width: 100% !important;
    }
</style>
