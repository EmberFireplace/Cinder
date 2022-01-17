<script>

    import VirtualScroll from 'svelte-virtual-scroll-list';
    import Message from "../../Message.svelte";
    import {getMessagesInChannel} from "./ChannelQuery";
    import {onMount, tick} from 'svelte';
    import {selectedChannelID} from "../Server";
    import MessageBar from "../../MessageBar/MessageBar.svelte";
    import FaunaStream from "../fauna";
    import {readMessageFunction} from "../../MessageQuery.js";
    let channelID = "0";
    let tempReactivityChecker = 0;
    let items = [];
    let loading = false;
    let list;
    let valueChecker = 0;
    let valueTemp = 0;
    let cursor = "beginning";
    let tempCursor = null;
    let channelJSON;
    let mostRecentKnownMessage = null;
    let bottomCursor = null;
    let chatRoomStream = null;
    $: if(!isInvalidChannelID()) {
        console.log(channelID);
        if(chatRoomStream !== null) {
            chatRoomStream.destroy();
        }
        chatRoomStream = new FaunaStream(null, channelID, "Channel");
        chatRoomStream.onUpdate.add(updateMessages);
    }

    $: if(channelID === channelID) {
        cursor = "beginning";
        tempCursor = null;
        mostRecentKnownMessage = null;
        bottomCursor = null;
        channelJSON = null;
        valueTemp = 0;
        valueChecker = 0;
        items = [];
    }

    function isInvalidChannelID() {
        return (channelID === "0" || channelID === 0);
    }

    async function updateMessages() {
        if(isInvalidChannelID()) {
            console.log("is invalid");
            return;
        }
        bottomCursor = null;
        console.log("updated messages\n\n\n");
        console.log("again channel id is : " + channelID + ", and the type is : " + typeof(channelID));
        console.log("the most recentKnownMessage is : " + items[items.length-1]);
        readMessageFunction(items[items.length-1]._id).then(value => {console.log("mostRecentKnownMessage is : " + JSON.stringify(value.data.findMessageByID.message).replace(/\"/g, ""));});
        mostRecentKnownMessage = items[items.length-1]._id;
        let newlyReadMessage = null;
        while(true) {
            newlyReadMessage = await getMessagesInChannelHelper(1);
            console.log("the id is : "  + newlyReadMessage._id);
            readMessageFunction(newlyReadMessage._id).then(value => {console.log(JSON.stringify(value.data.findMessageByID.message).replace(/\"/g, ""));});
            if(newlyReadMessage._id === mostRecentKnownMessage) {
                return;
            }
            items = [...items, newlyReadMessage];
            //items.push(newlyReadMessage);
        }

    }

    async function getMessagesInChannelHelper(numberOfMessages) {
        let myChannelJSON = getMessagesInChannel(channelID, numberOfMessages, bottomCursor);

        let finishedJson = await myChannelJSON;
        bottomCursor = JSON.stringify(finishedJson.data.getMessagesInChannel.after).replace(/\"/g, "");
        return finishedJson.data.getMessagesInChannel.data[0];
    }

    selectedChannelID.subscribe(value => {
        channelID = value;
        if(isInvalidChannelID()) {
            return;
        }
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
        if(isInvalidChannelID()) {
            return;
        }
        console.log("running cursor functions")
        cursor = tempCursor;
        channelJSON = getMessagesInChannel(channelID, 12, cursor);
        console.log("current cursor is : " + cursor);
        ///channelJSON.then(value => items = [...items, ...value.data.getMessagesInChannel.data]);
        channelJSON.then(value => {
            console.log(value.data.getMessagesInChannel.data)
            items = [...value.data.getMessagesInChannel.data, ...items]
            tempCursor = JSON.stringify(value.data.getMessagesInChannel.after).replace(/\"/g, "")
        })
        list.scrollToOffset(50);
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
        max-height: 85vh;
        width: 100%;
    }
</style>