import Vue from "vue";
import App from './App.vue'
import { BCol, BRow, BTableSimple, BThead, BTh, BTr, BTd, BButton, BFormInput, BForm, BTbody, BCollapse } from 'bootstrap-vue'

Vue.component('b-col', BCol)
Vue.component('b-row', BRow)
Vue.component('b-table-simple', BTableSimple)
Vue.component('b-thead', BThead)
Vue.component('b-th', BTh)
Vue.component('b-tr', BTr)
Vue.component('b-td', BTd)
Vue.component('b-button', BButton)
Vue.component('b-form-input', BFormInput)
Vue.component('b-form', BForm)
Vue.component('b-tbody', BTbody)
Vue.component('b-collapse', BCollapse)

new Vue({
    el: "#app",
    components: {
        App, 
    },
    template: "<App/>"
});