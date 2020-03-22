import SearchBar from '../src/components/SearchBar.vue';
import { createLocalVue, shallowMount, createWrapper, mount } from '@vue/test-utils';
import { BForm, BFormInput, BButton, BCol, BRow } from 'bootstrap-vue'
import _ from "lodash";
import ApiService from '../src/services/api-service'
import mocks from "./mocks.js"
const searchResults = mocks.searchResults

jest.mock('../src/services/api-service.ts')

const localVue = createLocalVue()
localVue.component('b-button', BButton)
localVue.component('b-form-input', BFormInput)
localVue.component('b-form', BForm)
localVue.component('b-col', BCol)
localVue.component('b-row', BRow)

describe('SearchBar.vue', () => {

    it('should render search form', () => {
        const wrapper = shallowMount(SearchBar, {
            localVue,
        })
        const form = wrapper.find(BForm)
        expect(form.exists()).toBeTruthy()
        expect(form.contains(BFormInput)).toBeTruthy()
        expect(form.contains(BButton)).toBeTruthy()
    })

    it('should render correct status bar when searching', () => {
        const wrapper = shallowMount(SearchBar, {
            localVue,
            data: () =>  ({
                status: "searching"
            })
        })
        expect(wrapper.find(".statusbar").text().includes("searching...")).toBeTruthy();
    })

    it('should render correct status bar when search is completed', () => {
        const wrapper = shallowMount(SearchBar, {
            localVue,
            data: () =>  ({
                status: "completed",
                recordsNumber: 3
            })
        })
        expect(wrapper.find(".statusbar").text().includes("Search complete and found")).toBeTruthy();
        expect(wrapper.find(".statusbar").text().includes("3")).toBeTruthy();
    })

    it('should render have status completed after infoking search() function', async () => {
        const wrapper = shallowMount(SearchBar, {
            localVue,
            mocks: {
                ApiService
            }
        })
        ApiService.search.mockResolvedValue(_.clone(searchResults))
        await wrapper.vm.search()
        expect(wrapper.vm.status === 'completed').toBeTruthy()
    })

    it('should render have correct records number after infoking search() function', async () => {
        const wrapper = shallowMount(SearchBar, {
            localVue,
            mocks: {
                ApiService
            }
        })
        ApiService.search.mockResolvedValue(_.clone(searchResults))
        await wrapper.vm.search()
        expect(wrapper.vm.recordsNumber === searchResults.length).toBeTruthy()
    })

    it('should emit searching event in search() function', async () => {
        const wrapper = shallowMount(SearchBar, {
            localVue,
            mocks: {
                ApiService
            }
        })
        ApiService.search.mockResolvedValue(_.clone(searchResults))
        await wrapper.vm.search()
        expect(wrapper.emitted()['searching']).toBeTruthy()
    })

    it('should emit root gotResults event in search() function', async () => {
        const wrapper = shallowMount(SearchBar, {
            localVue,
            mocks: {
                ApiService
            }
        })
        ApiService.search.mockResolvedValue(_.clone(searchResults))
        const rootWrapper = createWrapper(wrapper.vm.$root)
        await wrapper.vm.search()
        expect(_.isEqual(rootWrapper.emitted()['gotResults'][0][0], searchResults)).toBeTruthy()
    })

    it('should call search() function on form submit', async () => {
        const search = jest.fn()
        const wrapper = mount(SearchBar, {
            localVue,
            methods: {
                search
            }
        })
        wrapper.find(BForm).trigger('submit')
        await wrapper.vm.$nextTick()
        expect(search).toHaveBeenCalled()
    })

    
});