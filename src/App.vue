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
            <b-col><!-- Search Component --></b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    name: 'App',
    components: {

    }

})

</script>

<style module>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
