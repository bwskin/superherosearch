<template>
    <div>
        <b-button
            class="github-button"
            href="https://github.com/NaotoNomura/superherosearch"
            size="sm"
            type="submit"
        >
            GitHub
        </b-button>
        <img
            id="logo"
            src="../assets/logo.png"
        >
        <b-row>
            <b-col><SearchBar @searching="resetView" /></b-col>
        </b-row>
        <b-row>
            <b-col
                cols="10"
                sm="8"
                lg="6"
                offset="1"
                offset-sm="2"
                offset-lg="3"
            >
                <SearchResultsList :records="searchResults" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <ProfileView :profile="currentProfile" />
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import SearchBar from "./components/SearchBar.vue"
import SearchResultsList from "./components/SearchResultsList.vue"
import ProfileView from "./components/ProfileView.vue"

export default Vue.extend({
    name: 'App',
    components: {
        SearchBar,
        SearchResultsList,
        ProfileView
    },
    data: () => ({
        searchResults: [],
        currentProfile: null
    }),
    mounted() {
        this.$root.$on("profileView", this.viewProfile)
        this.$root.$on("gotResults", this.updateResults) 
    },
    methods: {
        updateResults(results) {
            this.searchResults = results
        },
        viewProfile(profile) {
            this.currentProfile = profile
        },
        resetView() {
            this.currentProfile = null
            this.searchResults = []
        }
    }

})

</script>

<style module>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>

<style>
    .btn {
        width: 100%;
    }
    #logo {
        display: block;
        width: 100%;
        max-width: 800px;
        margin: 2em auto;
    }
    .github-button {
        width: 7em;
        position: absolute;
        top: 10px;
        right:10px;
    }

    html, body {
        width: 100%;
    }

    body {
        padding: 0 15px;
    }
</style>
