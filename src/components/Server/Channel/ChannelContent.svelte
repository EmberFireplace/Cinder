<script>

    import VirtualScroll from 'svelte-virtual-scroll-list';
    import Message from "../../Message.svelte";
    import {getMessagesInChannel} from "./ChannelQuery";
    import {onMount, tick} from 'svelte';
    import {selectedChannelID} from "../Server";
    import MessageBar from "../../MessageBar/MessageBar.svelte";
    import {chatRoomStream} from "../fauna";
    let channelID = "319380215416488007";
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
    let bottomCursor = null;

    chatRoomStream.onUpdate.add(updateMessages);

    async function updateMessages() {
        bottomCursor = null;
        console.log("updated messages");
        mostRecentKnownMessage = items[0]._id;
        let newlyReadMessage = null;
        while(newlyReadMessage === null || newlyReadMessage._id !== mostRecentKnownMessage) {
            newlyReadMessage = await getMessagesInChannelHelper(1);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"  + JSON.stringify(newlyReadMessage));
            items = [...items, newlyReadMessage];
            //items.push(newlyReadMessage);
        }
        items = items;

    }

    async function getMessagesInChannelHelper(numberOfMessages) {
        let myChannelJSON = getMessagesInChannel(channelID, numberOfMessages, bottomCursor);

        let finishedJson = await myChannelJSON;
        console.log("finished json is : " + JSON.stringify(finishedJson.data.getMessagesInChannel.data));
        bottomCursor = JSON.stringify(finishedJson.data.getMessagesInChannel.after).replace(/\"/g, "");
        return finishedJson.data.getMessagesInChannel.data[0];
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