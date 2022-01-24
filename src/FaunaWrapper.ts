import {Client, query} from "faunadb";
import {storedUserClient} from "./store";

// let authorizationHeader:string = "Bearer fnAEbqCmntAAR9gdue3MMJ7lQnqRUmB1mSq52jaN";
// let endpoint:string = "https://graphql.us.fauna.com/graphql";
const q = query;
let adminKey = 'fnAEdmPomBAARWAMN2YuNAHXnAt24T-olkZbh3ze';
let client;

storedUserClient.subscribe(val => {
    client = val} )
storedUserClient.subscribe(() => console.log("managed to do it in typescript"));


// /**
//  * Function throws error if a invalid json is passed and returns null
//  * @param queryJson - a Json defining the query, the arguments, and the function to process
//  * @returns {Promise<any>} - a promise that resolves when the json request goes through to the internet.
//  */
// export async function doPost (queryJson:any) {
//     const res = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Authorization' : authorizationHeader},
//         body: JSON.stringify(
//             queryJson
//         )
//     })
//
//     const json = await res.json()
//     const result = json;
//     console.log(JSON.stringify(result));
//     return result;
// }

export class MessageListObject {
    //We will need a seperate object that has an updated timestamp if a message is updated, and the default server in fauna
    //When a new message is sent.
    channelIDToChannelListMap = new Map();
    currentMessageList: string[] = [];
    cursor:any;
    defaultQuerySize:number = 5;
    channelID:string;
    defaultSizeOfStoredMessages = 20; //We are going to pop off messages as we scroll up and push.
    constructor(channelID) {
        this.channelID = channelID;
    }

    public updated

}
export class MessageObject {
    public originalTimestamp:string; //a saved original timestamp used to sort and also display what time the message was originally sent. TODO::not used yet
    public timestamp:string; //the actual timestamp from fauna, but its updated everytime a user edits a message.
    public message:string;
    public profileURL:string; //The url to the profile pic that a user had at the time they originally sent the message.
    public userID:string; //The id of the user who sent the message.
    constructor(json) {
    }
    private static parseTimestampFromJSON(json) {

    }
    private static parseMessageFromJSON(json) {

    }
    private static parseProfileURLFromJSON(json) {

    }
    private static parseUserIDFromJSON(json) {

    }
}
export class ChannelObject {
    public channelName:string;
    public channelID:string;
    public timestamp:string;
    public channelType:string;
    constructor(json) {
        this.channelName = ChannelObject.parseChannelNameFromJSON(json);
        this.channelID = ChannelObject.parseChannelIDFromJSON(json);
        this.timestamp = ChannelObject.parseChannelTimestampFromJSON(json);
        this.channelType = ChannelObject.parseChannelTypeFromJSON(json);
    }
    public asString():string {
        return "channelName: " + this.channelName + ", channelID: " + this.channelID + ", timestamp: " + this.timestamp + ", channelType: " + this.channelType;
    }
    private static parseChannelNameFromJSON(json) {
        return json["data"]["channelName"];
    }
    private static parseChannelIDFromJSON(json) {
        return json["ref"]["id"];
    }
    private static parseChannelTimestampFromJSON(json) {
        return json["ts"];
    }
    private static parseChannelTypeFromJSON(json) {
        return json["data"]["channelType"];
    }
}
export class ServerObject {
    public serverName:string;
    public serverID:string;
    public serverOwnerID:string;
    public serverIconURL:string;
    public timestamp:string;
    constructor(json) {
        this.serverName = ServerObject.parseServerNameFromJSON(json);
        this.serverID = ServerObject.parseServerIDFromJSON(json);
        this.serverOwnerID = ServerObject.parseServerOwnerIDFromJSON(json);
        this.serverIconURL = ServerObject.parseServerIconURLFromJSON(json);
        this.timestamp = ServerObject.parseTimestampFromJSON(json);
    }
    public static createServer(serverName:string, serverOwnerID:string, serverIconURL:string) {

    }
    private static parseTimestampFromJSON(json):string {
        return json["ts"];
    }
    private static parseServerIconURLFromJSON(json):string {
        return json["data"]["serverIconURL"];
    }
    private static parseServerOwnerIDFromJSON(json):string {
        return json["data"]["serverOwner"]["id"];
    }
    private static parseServerIDFromJSON(json):string {
        return json["ref"]["id"];
    }
    private static parseServerNameFromJSON(json):string {
        return json["data"]["serverName"];
    }
    public getServerObjectAsString() {
        return "server name : " + this.serverName + ", serverID : " + this.serverID + ", serverOwnerID : " + this.serverOwnerID + ", serverIconURL : " + this.serverIconURL + ", timestamp : " + this.timestamp;
    }
}
export class UserFunctions {

}
export class ServerFaunaAPI {
    constructor() {
    }
    static async paginateForMessagesFromChannelInReverse(channelID:string, cursor:any, sizeOfMsg:number) {
        console.log("paginatingForMessagesFromChannelInReverse");
        return (await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index("all_messages_by_channel_id"),
                        q.Ref(q.Collection("Channel"), channelID)
                    ),
                    {size : sizeOfMsg, before:cursor}
                ),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        ))
    }
    static async paginateForServersFromUser(userID:string) {
        console.log("paginatingForServersFromUser");
        return (await client.query(
                q.Map(
                    q.Paginate(
                        q.Match(
                            q.Index("server_users_by_user"),
                            q.Ref(q.Collection("User"), userID)
                        )
                    ),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
        )
    }
    static async paginateForChannelsFromServer(serverID:string) {
        console.log("paginatingFroChannelsFromServer");
        return (await client.query(
                q.Map(
                    q.Paginate(
                        q.Match(
                            q.Index("server_channel_by_server"),
                            q.Ref(q.Collection("Server"), serverID)
                        )
                    ),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
        )
    }
}

