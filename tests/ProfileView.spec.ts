import ProfileView from '../src/components/ProfileView.vue';
import StatsGraph from '../src/components/StatsGraph.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import { BCol, BRow } from 'bootstrap-vue'
import _ from "lodash";
import mocks from "./mocks.js"
const profile = mocks.profile

const localVue = createLocalVue()
localVue.component('b-col', BCol)
localVue.component('b-row', BRow)

describe('ProfileView.vue', () => {

    it('should render hero name', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.find('.name').text().includes(profile.name)).toBeTruthy()
        wrapper.setData({
            window: {
                width: 800
            }
        })
        wrapper.vm.$nextTick()
        expect(wrapper.find('.name').text().includes(profile.name)).toBeTruthy()
    })

    it('should render hero publisher', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.find('.bio-field.publisher .value').text().includes(profile.biography.publisher)).toBeTruthy()
    })

    it('should render hero full name', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.find('.bio-field.full-name .value').text().includes(profile.biography['full-name'])).toBeTruthy()
    })

    it('should render hero place of birth', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.find('.bio-field.place-of-birth .value').text().includes(profile.biography['place-of-birth'])).toBeTruthy()
    })

    it('should render hero gender', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.find('.bio-field.gender .value').text().includes(profile.appearance.gender)).toBeTruthy()
    })

    it('should render hero race', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.find('.bio-field.race .value').text().includes(profile.appearance.race)).toBeTruthy()
    })

    it('should render hero height', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        const heightFieldText = wrapper.find('.bio-field.height .value').text()
        expect(heightFieldText.includes(profile.appearance.height[0])).toBeTruthy()
        expect(heightFieldText.includes(profile.appearance.height[1])).toBeTruthy()
    })

    it('should contain stats graph', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.contains(StatsGraph)).toBeTruthy()
    })

    it('should compute stats for stats graph', () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(_.isEqual(wrapper.vm.stats, [100,100,100,100,100,100])).toBeTruthy()
    })

    it('should pass stats to graph', async () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        await wrapper.vm.$nextTick()
        expect(_.isEqual(wrapper.find(StatsGraph).props("stats"), wrapper.vm.stats)).toBeTruthy()
    })

    it('should render hero image', async () => {
        const wrapper = shallowMount(ProfileView, {
            localVue,
            propsData: {
                profile:profile
            }
        })
        expect(wrapper.find('.img').element.style.backgroundImage).toBe('url('+profile.image.url+')')
    })
});