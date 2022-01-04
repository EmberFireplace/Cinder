<script>

    import VirtualScroll from 'svelte-virtual-scroll-list';
    import Message from "../../Message.svelte";
    import {getMessagesInChannel} from "./ChannelQuery";
    import {onMount, tick} from 'svelte';
    import {selectedChannelID} from "../Server";
    import MessageBar from "../../MessageBar/MessageBar.svelte";
    import {chatRoomStream} from "../fauna";
    let channelID = "317456344597659716";
    let tempReactivityChecker = 0;
    let items = [];
    let loading = false;
    let list;
    let valueChecker = 0;
    let valueTemp = 0;
    let cursor = "beginning";
    let otherTempCursor = "beginning";
    let tempCursor = null;
    let channelJSON;
    let mostRecentKnownMessage = null;

    chatRoomStream.onUpdate.add(updateMessages);

    async function updateMessages() {
        let updateCursor = "beginning";
        console.log("updated messages");

    }

    selectedChannelID.subscribe(value => {
        channelID = value;
        channelJSON = getMessagesInChannel(channelID, 12, null);
        channelJSON.then(value => {
            console.log("value is : " + JSON.stringify(value));
            cursor = JSON.stringify(value.data.getMessagesInChannel.after).replace(/\"/g, "")
            items = [...value.data.getMessagesInChannel.data];
            //mostRecentKnownMessage = items[0]._id;
            tempCursor = cursor;
        })
    })
    $: {if(valueChecker != valueTemp) {valueChecker = valueTemp;}}
    async function CursorFunction(channelJSON) {
        console.log("running cursor functions")
        cursor = tempCursor;
        channelJSON = getMessagesInChannel(channelID, 3, cursor);
        console.log("current cursor is : " + cursor);
        ///channelJSON.then(value => items = [...items, ...value.data.getMessagesInChannel.data]);
        channelJSON.then(value => {
            console.log(value.data.getMessagesInChannel.data)
            items = [...value.data.getMessagesInChannel.data, ...items]
            tempCursor = JSON.stringify(value.data.getMessagesInChannel.after).replace(/\"/g, "")
        })
        list.scrollToOffset(20);
    }
    // CursorFunction(channelJSON);
    onMount(async () => {
        list.scrollToBottom();
    });
</script>
    <div class="vs">
        <VirtualScroll
                bind:this={list}
                data={items}
                key="_id"
                let:data
                on:top={() => CursorFunction(channelJSON)}
                start={12}
        >
            <div slot="header">
                This is a header set via slot
            </div>
            <div>
                <Message userID={data._id}/>
            </div>
            <div slot="footer">
                This is a footer set via slot
            </div>
        </VirtualScroll>
    </div>
<style>
    .vs {
        height: 100%;
        width: 100%;
    }
</style>