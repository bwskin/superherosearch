import App from '../src/App.vue';
import SearchBar from '../src/components/SearchBar.vue';
import SearchResultsList from '../src/components/SearchResultsList.vue';
import ProfileView from '../src/components/ProfileView.vue';
import { createLocalVue, shallowMount,} from '@vue/test-utils';
import { BCol, BRow, BButton } from 'bootstrap-vue'
import _ from "lodash";
import mocks from "./mocks.js"
const searchResults = mocks.searchResults
const profile = mocks.profile

const localVue = createLocalVue()

localVue.component('b-col', BCol)
localVue.component('b-row', BRow)
localVue.component('b-button', BButton)


describe('App.vue', () => {

    it('should render logo', () => {

        const wrapper = shallowMount(App, {
            localVue
        })
        expect(wrapper.find('img').exists()).toBeTruthy()
    })

    it('should contain search bar', () => {

        const wrapper = shallowMount(App, {
            localVue
        })
        expect(wrapper.contains(SearchBar)).toBeTruthy()
    })

    it('should contain search results list', () => {

        const wrapper = shallowMount(App, {
            localVue
        })
        expect(wrapper.contains(SearchResultsList)).toBeTruthy()
    })

    it('should contain search profile view', () => {

        const wrapper = shallowMount(App, {
            localVue
        })
        expect(wrapper.contains(ProfileView)).toBeTruthy()
    })

    it('should pass search results to list', async () => {
        const data = {
            searchResults:searchResults
        }
        const wrapper = shallowMount(App, {
            localVue,
            data: () => _.clone(data)
        })
        expect(_.isEqual(wrapper.find(SearchResultsList).props("records"), data.searchResults)).toBeTruthy()
    
    })

    it('should pass profile to view', async () => {
        const data = {
            currentProfile:profile
        }
        const wrapper = shallowMount(App, {
            localVue,
            data: () => _.clone(data)
        })
        expect(_.isEqual(wrapper.find(ProfileView).props("profile"), data.currentProfile)).toBeTruthy()
    })

    it('should have currentProfile set after calling viewProfile()', async () => {

        const wrapper = shallowMount(App, {
            localVue
        })

        wrapper.vm.viewProfile(profile)
        await wrapper.vm.$nextTick()
        expect(_.isEqual(wrapper.vm.currentProfile, profile)).toBeTruthy()
    })

    it('should call viewProfile() on root profileView event', async () => {
        const viewProfile = jest.fn()
        const wrapper = shallowMount(App, {
            localVue,
            methods: {
                viewProfile
            },
        })
        wrapper.vm.$root.$emit("profileView", profile)
        expect(viewProfile).toHaveBeenCalled()
    })

    it('should have searchResults set after calling updateResults()', async () => {
        const wrapper = shallowMount(App, {
            localVue
        })
        wrapper.vm.updateResults(searchResults)
        await wrapper.vm.$nextTick()
        expect(_.isEqual(wrapper.vm.searchResults, searchResults)).toBeTruthy()
    })

    it('should call updateResults() on root gotResults event', async () => {
        const updateResults = jest.fn()
        const wrapper = shallowMount(App, {
            localVue,
            methods:{
                updateResults
            }
        })
        wrapper.vm.$root.$emit("gotResults", searchResults)
        expect(updateResults).toHaveBeenCalled()
    })

    it('should have searchResults and currentProfile empty after calling reset_view()', async () => {
        const data = {
            searchResults:searchResults,
            currentProfile:profile
        }
        const wrapper = shallowMount(App, {
            localVue,
            data: () => _.clone(data)
        })
        wrapper.vm.resetView(searchResults)
        expect(_.isEqual(wrapper.vm.searchResults, [])).toBeTruthy()
        expect(_.isEqual(wrapper.vm.currentProfile, null)).toBeTruthy()
    })

    it('should call resetView() on search bar searching event', async () => {
        const resetView = jest.fn()
        const wrapper = shallowMount(App, {
            localVue,
            methods: {
                resetView
            }
        })
        wrapper.find(SearchBar).vm.$emit("searching")
        expect(resetView).toHaveBeenCalled()
    })
});