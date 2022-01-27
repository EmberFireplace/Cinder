import {Client, query} from "faunadb";
import {storedUserID, storedUserSecret} from "../store";
import User from "./User";


const q = query;
let userClient;
let userID;
storedUserID.subscribe((val) => userID = val);
storedUserSecret.subscribe((val) => {
    userClient = new Client({
        secret: val,
        domain: 'db.us.fauna.com',
        port: 443,
        scheme: 'https',
    })
})
export default class Server {
    static async createServer(serverName:string, serverIconURL:string) {
        console.log("running createServer Function");
        console.log("user id is : " + userID);
        let serverOwnerVar = `Ref(Collection("Users"), ${userID})`;
        //Creates the server document.
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
        //Creates the ServerUsers document, aka adds the user to the server they just made.
        let numberOfServers:number = await User.getNumberOfServersUserIsIn();
        await (userClient.query(
            q.Create(
                q.Collection("ServerUsers"), {
                    data : {
                        serverID: q.Ref(q.Collection("Servers"), newlyCreatedServerID),
                        userID: q.Identity(),
                        userPreferenceNumber: numberOfServers
                    }
                }
            )
        ))
        console.log("newly created server id is : " + newlyCreatedServerID);
        console.log("response is : " + JSON.stringify(response));
    }
}