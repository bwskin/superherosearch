import SearchResult from '../src/components/SearchResult.vue';
import { createLocalVue, shallowMount, mount, createWrapper } from '@vue/test-utils';
import { BTr, BTd, BButton } from 'bootstrap-vue'
import _ from "lodash";
import mocks from "./mocks.js"
const profile = mocks.profile

const localVue = createLocalVue()
localVue.component('b-tr', BTr)
localVue.component('b-td', BTd)
localVue.component('b-button', BButton)

describe('SearchResult.vue', () => {

    it('should render hero name', () => {
        const wrapper = shallowMount(SearchResult, {
            localVue,
            propsData: {
                record:profile
            }
        })
        expect(wrapper.find(".sr-name").text().includes(profile.name)).toBeTruthy()
    })

    it('should render hero name', () => {
        const wrapper = shallowMount(SearchResult, {
            localVue,
            propsData: {
                record:profile
            }
        })
        expect(wrapper.find(".sr-publisher").text().includes(profile.biography.publisher)).toBeTruthy()
    })

    it('should render view button', () => {
        const wrapper = shallowMount(SearchResult, {
            localVue,
            propsData: {
                record:profile
            }
        })
        expect(wrapper.find(BButton).exists()).toBeTruthy()
    })
    
    it('should call view() function on button click', async () => {
        const view = jest.fn()
        const wrapper = mount(SearchResult, {
            localVue,
            propsData: {
                record:profile
            },
            methods: {
                view:view
            }
        })
        wrapper.find(BButton).trigger('click')
        expect(view).toHaveBeenCalled()
    })

    it('should emit root profileView event when calling view() function', async () => {
        const wrapper = mount(SearchResult, {
            localVue,
            propsData: {
                record:profile
            },
        })
        wrapper.vm.view()
        const rootWrapper = createWrapper(wrapper.vm.$root)
        expect(_.isEqual(rootWrapper.emitted()['profileView'][0][0], profile)).toBeTruthy()
    })
});