<template>
    <div class="searchbar">
        <b-row />
        <b-form @submit="search">
            <b-row>
                <b-col
                    cols="8"
                    sm="7"
                    md="6"
                    lg="4"
                    offset-sm="1"
                    offset-md="2"
                    offset-lg="3"
                >
                    <b-form-input
                        v-model="text"
                        placeholder="Hero name..."
                    />
                </b-col>
                <b-col
                    cols="4"
                    sm="3"
                    md="2"
                    lg="2"
                >
                    <b-button
                        variant="primary"
                        type="submit"
                    >
                        Search
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
        <b-row v-if="status != 'init'">
            <b-col class="statusbar">
                <span v-if="status == 'searching'">searching...</span>
                <span v-if="status == 'completed'">Search complete and found {{ recordsNumber }} {{ recordsNumber > 1 || recordsNumber === 0 ? "records" : "record" }}!</span>
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
        recordsNumber: 0,
    }),

    methods: {
        search: async function(event) {
            if (event) {
                event.preventDefault();
            }
            this.status = "searching"
            this.$emit('searching')
            const results = await ApiService.search(this.text)
            this.recordsNumber = results ? results.length : 0
            this.$root.$emit('gotResults', results)
            this.status = "completed"
        }
    }
})

</script>

<style>
    .searchbar {
        padding: 10px;
    }

    .statusbar {
        text-align: center
    }
</style>
