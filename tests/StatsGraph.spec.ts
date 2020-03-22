import StatsGraph from '../src/components/StatsGraph.vue';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import _ from "lodash";

const localVue = createLocalVue()

describe('StatsGraph.vue', () => {

    it('should compute points', () => {
        const wrapper = shallowMount(StatsGraph, {
            localVue,
        })
        expect(wrapper.vm.points === "150,150 150,150 150,150 150,150 150,150 150,150").toBeTruthy()
        wrapper.setProps({
            stats:[100,100,100,100,100,100]
        })
        expect(wrapper.vm.points === "150,300 280,225 280,75 150,0 20,75 20,225").toBeTruthy()
    })


    it('should pass computed points to polygon in svg', () => {
        const wrapper = shallowMount(StatsGraph, {
            localVue,
            propsData: {
                stats:[100,100,100,100,100,100]
            }
        })
        expect(wrapper.find("polygon").attributes('points') === "150,300 280,225 280,75 150,0 20,75 20,225").toBeTruthy()
    })
    
});