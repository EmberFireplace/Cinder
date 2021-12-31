import {doPost} from "../../Query";

export async function getChannelName(id) {
    let jsonQuery = {
    "query": "query getChannelName($arg1: ID!) { findChannelByID(id: $arg1) { channelName } }",
    "operationName": "getChannelName",
    "variables": {"arg1": id}
    };
    return JSON.stringify((await doPost(jsonQuery)).data.findChannelByID.channelName).replace(/\"/g, "");
}

export async function getMessagesInChannel(channelID, size, cursor) {
    let jsonQueryWithCursor = {
        "query": "query getMessagesFromChannel($arg1: ID! $arg2: Int! $arg3: String!) { getMessagesInChannel(channel: $arg1 _size: $arg2 _cursor: $arg3) { data { _id } before after } }",
        "operationName": "getMessagesFromChannel",
        "variables": {"arg1": channelID, "arg2": size, "arg3": cursor}
    };
    let jsonQuery = {
        "query": "query getMessagesFromChannel($arg1: ID! $arg2: Int!) { getMessagesInChannel(channel: $arg1 _size: $arg2) { data { _id } before after } }",
        "operationName": "getMessagesFromChannel",
        "variables": {"arg1": channelID, "arg2": size}
    };
    if(cursor !== null) {
        console.log("cursor is : " + cursor);
        console.log("doing json query with cursor");
        return (await doPost(jsonQueryWithCursor));
    }
    console.log("doing json query without cursor");
    return ((await doPost(jsonQuery)));
}
export async function updateChannel(channelID) {
    let jsonQuery = {
        "query" : `query UDF { updateChannel(channel: ${channelID}) }`,
        "operationName": "UDF",
        "variables" : {}
    }
    return await doPost(jsonQuery);
}
