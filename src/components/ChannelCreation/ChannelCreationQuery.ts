import {doPost} from "../Query";

export async function createChannelMutation(ServerID:string) {
    let jsonQuery = {
        "query": "mutation createChannelFunc {\n" +
            "  createChannel(data: {\n" +
            "    channelName: \"General\"\n" +
            "    channelType: \"Text\"\n" +
            `    server: {connect: ${ServerID}}\n` +
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
    return await doPost(jsonQuery);
}