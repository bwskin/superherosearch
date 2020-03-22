<template>
    <b-tr>
        <b-td class="sr-name">
            {{ record.name }}
        </b-td>
        <b-td class="sr-publisher">
            {{ record.biography.publisher }}
        </b-td>
        <b-td>
            <b-button
                variant="outline-primary"
                class="sr-view"
                @click="view()"
            >
                View
            </b-button>
        </b-td>
    </b-tr>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    name: 'SearchResult',
    props: {
        record : {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        
    }),
    methods: {
        view() {
            this.$root.$emit('profileView', this.record)
        }
    }
})

</script>

<style>
    .record-row {
        padding: 5px;
    }
</style>
