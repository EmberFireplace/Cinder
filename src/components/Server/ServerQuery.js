import {doPost} from "../Query";


export async function getServerInfo(id) {
    let jsonQuery = {
        "query": "query getServerInfoFunc($arg1: ID!) { findServerByID(id: $arg1) { _id serverName serverIconURL } }",
        "operationName": "getServerInfoFunc",
        "variables": {"arg1": id}
    };
    return ((await doPost(jsonQuery)));
}
export async function testQuery() {
    let jsonQuery = {
        "query": "mutation addUserToServer {\n" +
            "  updateUser (data: {\n" +
            "    joinedServers: {connect: 319111921950261319}\n" +
            "  } id: \"317456344595562564\") \n" +
            "}",
        "operationName": "addUserToServer",
        "variables" : {}
    }
    return await doPost(jsonQuery);
}

/**
 * async function that performs a json request to get a list of all server ids from a userID
 * @param userID - the id of the user that is joined to all the servers you are getting
 * @returns {Promise<*>} - returns an array of every server id the user is in
 */
export async function getServersFromUserID(userID) {
    //TODO: implement paging for when we have users with over 50 servers.
    let jsonQuery = {
            "query": "query getServersFromUserFunc($userID: ID!) {\n" +
                "  findUserByID(id: $userID) {\n" +
                "    joinedServers {\n" +
                " \t\t\tdata {\n" +
                "        _id\n" +
                "      }   \n" +
                "    }\n" +
                "  }\n" +
                "}",
            "operationName": "getServersFromUserFunc",
            "variables": {"userID": userID}
        };
    return helperServerFromUserID(doPost(jsonQuery));
}

/**
 * turns a promisedJSON object into a list of serverIDS keyed with the 'id' key.
 * @param JSONPromise - a promised post json object.
 * @returns {Promise<*[]>} a list of serverIDs keyed with 'id'.
 */
async function helperServerFromUserID(JSONPromise) {
    let returnedJSON = await JSONPromise;
    //TODO null error checking and stuff idk how to do yet.
    let list = [];
    returnedJSON.data.findUserByID.joinedServers.data.forEach(value => {
        list.push({id: value._id});
    });
    return list;
}

export async function getServerIconURLFromID(serverID) {
    let jsonQuery = {
        "query": "query getServerIconFunc($serverID: ID!) {\n" +
            "  findServerByID(id: $serverID) {\n" +
            "    serverIconURL\n" +
            "  }\n" +
            "}",
        "operationName": "getServerIconFunc",
        "variables": {"serverID": serverID}
    };
    if(isNaN(parseInt(serverID, 10))) {
        return new Promise(function (resolve, reject) {});
    }
    return ((await doPost(jsonQuery)).data.findServerByID.serverIconURL);
}
export async function getChannelsFromServerID(serverID) {
    let jsonQuery = {
        "query": "query Test($serverID: ID!) { findServerByID(id: $serverID) { channels { data { _id channelName } } } }",
        "operationName": "Test",
        "variables": {"serverID": serverID}
    };
    if(isNaN(parseInt(serverID)) || parseInt(serverID) === 0) {
        return new Promise(function (resolve, reject) {});
    }
    return ((await doPost(jsonQuery)).data.findServerByID.channels.data);
}