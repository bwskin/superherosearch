<template>
    <div v-if="records.length > 0">
        <div class="expander">
            <b-button @click="visible = !visible">{{ visible ? "Collapse results" : "Expand results" }}</b-button>
            <br>
            <span v-if="!visible">...</span>
        </div>
        <b-collapse v-model="visible">
            <b-table-simple>
                <b-thead>
                    <b-tr>
                        <b-th>
                            Name
                        </b-th>
                        <b-th>
                            Publisher
                        </b-th>
                        <b-th>
                            
                        </b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <SearchResult v-for="record in records" :record="record"/>
                </b-tbody>
            </b-table-simple>
        </b-collapse>
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
        visible: false
    }),
    props: ["records"],
    mounted() {
        this.$root.$on("profileView", this.collapse)
        this.$root.$on("gotResults", this.expand) 
    },
    methods: {
        toggle() {
            this.visible = !this.visible
        },
        collapse() {
            this.visible = false;
        },
        expand() {
            this.visible = true;
        }
    }

})

</script>

<style>
    .list-header {
        font-weight: bold
    }
    .expander {
        text-align: center;
        margin-bottom: 1em;
    }
    .expander a {
        cursor: pointer;
    }
</style>
