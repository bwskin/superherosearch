export default class ApiService {

    public static async search(name) {
        const response = await fetch("http://localhost:8088/proxy/api/2645248895760055/search/"+name);
        const json_response = await response.json();
        return json_response.results
    }

}