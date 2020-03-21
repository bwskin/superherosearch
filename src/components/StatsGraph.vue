<template>
    <div class="graph-root">
        <svg width="100%" height="400" viewBox="0 0 400 400">
            <g transform="translate(25,25)">
                <g transform="translate(25,25)">
                    <circle cx="150" cy="150" r="152"   stroke="black" stroke-width="4" fill="#ddffeeff" />
                    <circle cx="150" cy="150" r="37.5"  stroke-dasharray="5" stroke="black" stroke-width="1" fill="#00000000" />
                    <circle cx="150" cy="150" r="75"    stroke-dasharray="5" stroke="black" stroke-width="1" fill="#00000000" />
                    <circle cx="150" cy="150" r="112.5" stroke-dasharray="5" stroke="black" stroke-width="1" fill="#00000000" />
                    <line x1="150" y1="150" x2="150" y2="300" stroke-dasharray="5" style="stroke:black;stroke-width:1" />
                    <line x1="150" y1="150" x2="280" y2="225" stroke-dasharray="5" style="stroke:black;stroke-width:1" />
                    <line x1="150" y1="150" x2="280" y2="75" stroke-dasharray="5" style="stroke:black;stroke-width:1" />
                    <line x1="150" y1="150" x2="150" y2="0" stroke-dasharray="5" style="stroke:black;stroke-width:1" />
                    <line x1="150" y1="150" x2="20" y2="75" stroke-dasharray="5" style="stroke:black;stroke-width:1" />
                    <line x1="150" y1="150" x2="20" y2="225" stroke-dasharray="5" style="stroke:black;stroke-width:1" />
                    <polygon :points="points" style="fill:#abcdefaa;stroke:#abcdefff;stroke-width:1;transformOrigin: 150px 150px" transform="scale(1,-1)"/>
                </g>
                <text x="175" y="18" text-anchor="middle" style="fill:black">intelligence</text>
                <text x="340.5" y="103.5" text-anchor="middle" style="fill:black">strength</text>
                <text x="334.5" y="252.5" text-anchor="middle" style="fill:black">speed</text>
                <text x="14" y="252.5" text-anchor="middle" style="fill:black">power</text>
                <text x="175" y="342" text-anchor="middle" style="fill:black">durability</text>
                <text x="10" y="103.5" text-anchor="middle" style="fill:black">combat</text>
            </g>
        </svg>
    </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    name: 'StatsGraph',
    data: () => ({

    }),
    props: ["stats"],
    computed: {
        points: function() {
            const get_x = (stat, n) => 150 + stat/100 * 150 * Math.sin(Math.PI/3*n)
            const get_y = (stat, n) => 150 + stat/100 * 150 * Math.cos(Math.PI/3*n)
            return this.stats.map((stat, n) => [Math.round(get_x(stat,n)), Math.round(get_y(stat,n))]).join(" ")
        }
    }
})

</script>

<style>
    .record-row {
        padding: 5px;
    }

    svg {
        display: block;
        margin: 0 auto;
    }

    .graph-root {
        width: 100%
    }
</style>
