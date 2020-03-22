import ApiService from "../src/services/api-service"
import mocks from "./mocks.js"
import _ from "lodash"

describe('ProfileView.vue', () => {

    it('should return results from response', async () => {
        fetch.mockResponseOnce(JSON.stringify({ results: mocks.searchResults }));
        const res = await ApiService.search("batman")
        expect(_.isEqual(res, mocks.searchResults)).toBeTruthy()
    })

});