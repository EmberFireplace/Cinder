import {doPost} from "./Query";

export async function createMessageFunction(message, channel, user) {
    let jsonQuery = {
        "query": "mutation createMessageFunc($messageVar: String!, $channelID: ID!, $userID: ID!) {\n" +
            "  createMessage(data: { message: $messageVar channel: { connect: $channelID } user: { connect: $userID } }) { message user { username } } }",
        "operationName": "createMessageFunc",
        "variables": {"messageVar": message, "channelID": channel, "userID": user}
    };
    return JSON.stringify((await doPost(jsonQuery)));
}

export async function readMessageFunction(messageID) {
    let jsonQuery = {
        "query": "query readMessageFunc ($messageID: ID!) { findMessageByID(id: $messageID) { message user { username } } }",
        "operationName": "readMessageFunc",
        "variables": {"messageID": messageID}
    };
    return ((await doPost(jsonQuery)));
}

export async function deleteMessageFunction(messageID) {
    let jsonQuery = {
        "query": "mutation deleteMessageFunc($messageID: ID!) { deleteMessage(id: $messageID) { message } }",
        "operationName": "readMessageFunc",
        "variables": {"messageID": messageID}
    };
    return ((await doPost(jsonQuery)));
}
