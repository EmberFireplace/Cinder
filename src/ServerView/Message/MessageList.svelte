<script>

    import {ServerFaunaAPI} from "../../FaunaWrapper.ts";

    let list = [];
    export let onChannelElementClick = (event) => {
        let channelObject = event.detail.channelObject;
        console.log("channel element was clicked name is : " + channelObject.channelName);
        ServerFaunaAPI.paginateForMessagesFromChannelInReverse(channelObject.channelID, null, 3).then((json) => console.log(JSON.stringify(json)));
    }
</script>
<div>

</div>