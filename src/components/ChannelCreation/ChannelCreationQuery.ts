import {doPost} from "../Query";

export async function createChannelMutation(channelName:string, serverID:string) {
    let jsonQuery = {
        "query": "mutation createChannelFunc {\n" +
            "  createChannel(data: {\n" +
            `    channelName: "${channelName}"\n` +
            "    channelType: \"Text\"\n" +
            `    server: {connect: ${serverID}}\n` +
            "    users: []\n" +
            "  }) {\n" +
            "    channelType\n" +
            "    channelName\n" +
            "    server {\n" +
            "      _id\n" +
            "    }\n" +
            "  }\n" +
            "}",
        "operationName": "createChannelFunc",
        "variables" : {}
    }
    await doPost(jsonQuery);
    return await updateServer(serverID);
}
export async function updateServer(serverID:string) {
    let jsonQuery = {
        "query" : `query UDF { updateServer(server: ${serverID}) }`,
        "operationName": "UDF",
        "variables" : {}
    }
    return await doPost(jsonQuery);
}
