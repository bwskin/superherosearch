import SearchResultsList from '../src/components/SearchResultsList.vue';
import SearchResult from '../src/components/SearchResult.vue';
import { createLocalVue, shallowMount, mount, createWrapper } from '@vue/test-utils';
import _ from "lodash";
import mocks from "./mocks.js"
const searchResults = mocks.searchResults
import { BTableSimple, BThead, BTh, BTd, BTr, BButton, BTbody, BCollapse } from 'bootstrap-vue'

const localVue = createLocalVue()

localVue.component('b-table-simple', BTableSimple)
localVue.component('b-thead', BThead)
localVue.component('b-th', BTh)
localVue.component('b-tr', BTr)
localVue.component('b-button', BButton)
localVue.component('b-tbody', BTbody)
localVue.component('b-td', BTd)
localVue.component('b-collapse', BCollapse)

describe('SearchResultsList.vue', () => {

    it('should render collapse button', () => {
        const wrapper = shallowMount(SearchResultsList, {
            localVue,
            propsData: {
                records:searchResults
            }
        })
        expect(wrapper.find(BButton).exists()).toBeTruthy()
    })

    it('should render expand indicator when not visible', () => {
        const wrapper = mount(SearchResultsList, {
            localVue,
            propsData: {
                records:searchResults
            },
            data: () => ({
                visible: false
            })
        })
        expect(wrapper.find(".expand-indicator").exists()).toBeTruthy()
    })

    it('should render results list', () => {
        const wrapper = mount(SearchResultsList, {
            localVue,
            propsData: {
                records:searchResults
            },
            data: () => ({
                visible: true
            })
        })
        expect(wrapper.findAll(SearchResult).length === searchResults.length).toBeTruthy()
    })

    it('should pass correct records to results list', () => {
        const wrapper = mount(SearchResultsList, {
            localVue,
            propsData: {
                records:searchResults
            },
            data: () => ({
                visible: true
            })
        })
        const results = wrapper.findAll(SearchResult)
        for(let i = 0; i<searchResults.length; i++) {
            expect(_.isEqual(results.at(i).vm.record, searchResults[i])).toBeTruthy()
        }
    })

    it('should call collapse() on root profileView event', async () => {
        const collapse = jest.fn()
        const wrapper = shallowMount(SearchResultsList, {
            localVue,
            methods: {
                collapse
            },
        })
        wrapper.vm.$root.$emit("profileView")
        expect(collapse).toHaveBeenCalled()
    })

    it('should call expand() on root gotResults event', async () => {
        const expand = jest.fn()
        const wrapper = shallowMount(SearchResultsList, {
            localVue,
            methods: {
                expand
            },
        })
        wrapper.vm.$root.$emit("gotResults")
        expect(expand).toHaveBeenCalled()
    })

    it('should call toggle() on button click', async () => {
        const toggle = jest.fn()
        const wrapper = mount(SearchResultsList, {
            localVue,
            methods: {
                toggle
            },
            propsData: {
                records:searchResults
            }
        })
        wrapper.find(BButton).trigger('click')
        expect(toggle).toHaveBeenCalled()
    })

    it('should chnage visibility when called toggle() function', () => {
        const wrapper = mount(SearchResultsList, {
            localVue,
            propsData: {
                records:searchResults
            }
        })
        const previous = wrapper.vm.visible
        wrapper.vm.toggle()
        expect(wrapper.vm.visible !== previous).toBeTruthy()
    })

    it('should chnage truthy visibility when called expand() function', () => {
        const wrapper = mount(SearchResultsList, {
            localVue,
            propsData: {
                records:searchResults
            },
            data: () => ({
                visible: false
            })
        })
        wrapper.vm.expand()
        expect(wrapper.vm.visible).toBeTruthy()
    })

    it('should chnage falsy visibility when called collapse() function', () => {
        const wrapper = mount(SearchResultsList, {
            localVue,
            propsData: {
                records:searchResults
            },
            data: () => ({
                visible: true
            })
        })
        wrapper.vm.collapse()
        expect(wrapper.vm.visible).toBeFalsy()
    })
});