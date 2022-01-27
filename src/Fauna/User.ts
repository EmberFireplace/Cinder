import {storedUserSecret} from "../store";
import {Client, query} from "faunadb";
const q = query;
let userClient;
storedUserSecret.subscribe((val) => {
    userClient = new Client({
        secret: val,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    })
})
export default class User {
    static async getNumberOfServersUserIsIn() {
        let response = await (userClient.query(
            q.Count(
                q.Match(q.Index("ServersByUser"), q.Identity())
            )
        ))
        return response;
    }
}