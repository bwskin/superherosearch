export default class ApiService {

    public static async search(name: string) {
        const response = await fetch("/api/2645248895760055/search/"+name);
        const json_response = await response.json();
        return json_response.results
    }

}