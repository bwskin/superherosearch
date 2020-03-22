export default class ApiService {

    public static async search(name: string): Promise<Array<object>> {
        return (
            await (
                await fetch("/api/2645248895760055/search/"+name)
            ).json()
        ).results;
    }

}