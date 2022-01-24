<script>

    import {MessageObject, ServerFaunaAPI} from "../../FaunaWrapper.ts";

    let channelIDToMessageListMap = new Map();
    let currentMessageList = [];

    let list = [];//Have to use this because of Sortable List is weird.

    $: list = currentMessageList;

    export let onChannelElementClick = (event) => {
        let channelObject = event.detail.channelObject;
        console.log("channel element was clicked name is : " + channelObject.channelName);
        ServerFaunaAPI.paginateForMessagesFromChannelInReverse(channelObject.channelID, null, 3).then((messagesJson) => {
            let tempMessagesList = [];
            messagesJson["data"].forEach((messageJson) => {
                tempMessagesList.push(new MessageObject(messageJson));
            })

        });
    }
</script>
<div>

</div>