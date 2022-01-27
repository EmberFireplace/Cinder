import {Client, query} from "faunadb";
import {storedUserClient, storedUserID} from "../store";


const q = query;
let userClient;
let userID;
storedUserID.subscribe((val) => userID = val);
storedUserClient.subscribe((val) => userClient = val);
export default class Server {
    static async createServer(serverName:string, serverIconURL:string) {
        console.log("running createServer Function");
        console.log("user id is : " + userID);
        let serverOwnerVar = `Ref(Collection("Users"), ${userID})`;
        let response = await (userClient.query(
            q.Create(
                q.Collection("Servers"), {
                    data : {
                        serverName: serverName,
                        serverIconURL: serverIconURL,
                        serverOwner: q.Identity()
                    }
                }
            )
        ));
        let newlyCreatedServerID = response['ref']['id'];
        console.log("newly created server id is : " + newlyCreatedServerID);
        console.log("response is : " + JSON.stringify(response));
    }
}