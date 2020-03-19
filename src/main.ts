import Vue from "vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import App from './App.vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    el: "#app",
    template: "<App/>",
    components: {
        App
    }
});