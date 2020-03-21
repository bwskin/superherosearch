export default class ApiService {

    public static async search(name: string): Promise<Array<object>> {
        const response = await fetch("/api/2645248895760055/search/"+name);
        const jsonResponse = await response.json();
        return jsonResponse.results
    }

}