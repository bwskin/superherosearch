<template>
    <div v-if="profile" >
        <b-row class="record-row">
            <b-col cols="7" lg="5" offset-lg="1" xl="4" offset-xl="2">
                <div class="img" v-bind:style="{ backgroundImage: 'url(' + profile.image.url + ')' }">
                
                </div>
                <!--<b-img-lazy class="profile-img" :src="profile.image.url" blank-color="white"/>-->
            </b-col>
            <b-col cols="5" lg="5" xl="4">
                <div class="name">{{profile.name}}</div>
                <b-row class="bio-field">
                    <b-col cols="12" sm="6" class="label">Publisher:</b-col>
                    <b-col cols="12" sm="6">{{profile.biography.publisher}}</b-col>
                </b-row>            <b-row class="bio-field">
                    <b-col cols="12" sm="6" class="label">Full name:</b-col>
                    <b-col cols="12" sm="6">{{profile.biography['full-name']}}</b-col>
                </b-row>
                <b-row class="bio-field">
                    <b-col cols="12" sm="6" class="label">Place of birth:</b-col>
                    <b-col cols="12" sm="6">{{profile.biography['place-of-birth']}}</b-col>
                </b-row>
                <b-row class="bio-field">
                    <b-col cols="12" sm="6" class="label">Gender:</b-col>
                    <b-col cols="12" sm="6">{{profile.appearance.gender}}</b-col>
                </b-row>
                <b-row class="bio-field">
                    <b-col cols="12" sm="6" class="label">Race:</b-col>
                    <b-col cols="12" sm="6">{{profile.appearance.race}}</b-col>
                </b-row>
                <b-row class="bio-field">
                    <b-col cols="12" sm="6" class="label">Height:</b-col>
                    <b-col cols="12" sm="6"><div v-for="height in profile.appearance.height">{{ height }}</div></b-col>
                </b-row>
                <b-row class="bio-field graph-bio">
                    <StatsGraph class="d-none d-md-block" :stats="stats" />
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="graph">
                <StatsGraph class="d-md-none" :stats="stats" />
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import StatsGraph from "./StatsGraph.vue"

export default Vue.extend({
    name: 'ProfileView',
    components: {
        StatsGraph
    },
    data: () => ({
        
    }),
    props: ["profile"],
    computed: {
        stats: function() {
            const stats = []
            if(this.profile) {
                stats.push(this.profile.powerstats.intelligence)
                stats.push(this.profile.powerstats.strength)
                stats.push(this.profile.powerstats.speed)
                stats.push(this.profile.powerstats.durability)
                stats.push(this.profile.powerstats.power)
                stats.push(this.profile.powerstats.combat)
            }
            return stats
        }
    }
})

</script>

<style>
    .profile-img {
        width:100%;
        /*height:250px;*/
        object-fit: cover;
    }

    .bio-field .label {
        font-weight: bold;
    }

    .name {
        font-size: xx-large;
    }

    .publisher {
        font-size: x-small;
    }

    .img {
        background-repeat: no-repeat;
        min-height: 400px;
        width: 100%;
        background-position: center; 
        height: 100%
    }

    .graph {
        width: 100%;
    }

    .graph-bio {
        padding-right: 15px;
    }
</style>
