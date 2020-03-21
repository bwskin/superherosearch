<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Superhero search!</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"/>
            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-button href="https://github.com/NaotoNomura/superherosearch" size="sm" type="submit">GitHub</b-button>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-row>
            <b-col><SearchBar @searching="resetView"/></b-col>
        </b-row>
        <b-row>
            <b-col cols="10" sm="8" offset="1" offset-sm="2">
                <SearchResultsList :records="search_results"/>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <ProfileView :profile="current_profile"/>
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
        search_results: [],
        current_profile: null
    }),
    methods: {
        updateResults(results) {
            this.search_results = results
        },
        viewProfile(profile) {
            this.current_profile = profile
        },
        resetView() {
            this.current_profile = null
            this.search_results = []
        }
    },
    mounted() {
        this.$root.$on("profileView", this.viewProfile)
        this.$root.$on("gotResults", this.updateResults) 
    }

})

</script>

<style module>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
