<template>
    <div v-if="profile">
        <b-row class="profile-container">
            <b-col
                class="profile"
                cols="12"
                lg="10"
                xl="6"
                offset-lg="1"
                offset-xl="3"
            >
                <b-row v-if="window.width < 576">
                    <b-col cols="12">
                        <div class="name">
                            {{ profile.name }}
                        </div>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        cols="12"
                        sm="6"
                        lg="6"
                        :style="{ padding: (window.width < 576 ? '5px' : '15px'), 'padding-right': (window.width < 576 ? '5px' : 0) }"
                    >
                        <div
                            class="img"
                            :style="{ backgroundImage: 'url(' + profile.image.url + ')' }"
                        />
                    </b-col>
                    <b-col
                        cols="12"
                        sm="6"
                        lg="6"
                    >
                        <div
                            v-if="window.width >= 576"
                            class="name"
                        >
                            {{ profile.name }}
                        </div>
                        <b-row class="bio-field publisher">
                            <b-col
                                cols="6"
                                class="label"
                            >
                                Publisher:
                            </b-col>
                            <b-col
                                cols="6"
                                class="value"
                            >
                                {{ profile.biography.publisher }}
                            </b-col>
                        </b-row>
                        <b-row class="bio-field full-name">
                            <b-col
                                cols="6"
                                class="label"
                            >
                                Full name:
                            </b-col>
                            <b-col
                                cols="6"
                                class="value"
                            >
                                {{ profile.biography['full-name'] }}
                            </b-col>
                        </b-row>
                        <b-row class="bio-field place-of-birth">
                            <b-col
                                cols="6"
                                class="label"
                            >
                                Place of birth:
                            </b-col>
                            <b-col
                                cols="6"
                                class="value"
                            >
                                {{ profile.biography['place-of-birth'] }}
                            </b-col>
                        </b-row>
                        <b-row class="bio-field gender">
                            <b-col
                                cols="6"
                                class="label"
                            >
                                Gender:
                            </b-col>
                            <b-col
                                cols="6"
                                class="value"
                            >
                                {{ profile.appearance.gender }}
                            </b-col>
                        </b-row>
                        <b-row class="bio-field race">
                            <b-col
                                cols="6"
                                class="label"
                            >
                                Race:
                            </b-col>
                            <b-col
                                cols="6"
                                class="value"
                            >
                                {{ profile.appearance.race }}
                            </b-col>
                        </b-row>
                        <b-row class="bio-field height">
                            <b-col
                                cols="6"
                                class="label"
                            >
                                Height:
                            </b-col>
                            <b-col
                                cols="6"
                                class="value"
                            >
                                <div
                                    v-for="(height, index) in profile.appearance.height"
                                    :key="index"
                                >
                                    {{ height }}
                                </div>
                            </b-col>
                        </b-row>
                        <b-row class="bio-field graph-bio">
                            <StatsGraph
                                v-if="window.width >= 768"
                                :stats="stats"
                            />
                        </b-row>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="graph">
                        <StatsGraph
                            v-if="window.width < 768"
                            :stats="stats"
                        />
                    </b-col>
                </b-row>
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
    props: {
        profile: {
            type: Object,
            default: () => ({})
        }
    },
    data: () => ({
        window: {
            width: 0
        }
    }),
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
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.window.width = window.innerWidth;
        }
    }
})

</script>

<style>
    .bio-field .label {
        font-weight: bold;
    }

    .name {
        font-size: xx-large;
    }

    .img {
        background-repeat: no-repeat;
        min-height: 400px;
        width: 100%;
        background-position: center; 
        height: 100%;
        background-size: cover;
    }

    .graph {
        width: 100%;
    }

    .graph-bio {
        padding-right: 15px;
    }

    .profile {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        padding-top: 10px;
    }

    .profile-container {
        padding: 15px;
    }
</style>
