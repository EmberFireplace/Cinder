<script>

    import VirtualScroll from 'svelte-virtual-scroll-list';
    import Message from "../../Message.svelte";
    import {onMount, tick} from 'svelte';
    import {selectedChannelID} from "../Server";
    import FaunaStream from "../fauna";
    import {PagnatableMessages} from "../../../wrapper/FaunaWrapper.ts";

    let channelID = "0";
    let tempReactivityChecker = 0;
    let items = [];
    let loading = false;
    let list;
    let chatRoomStream = null;

    let newItems = [];
    let pagnatableMessages;
    let threadLock = false;
    function updateNewItems() {
        while(threadLock){}
        threadLock = true;
        newItems = pagnatableMessages.getPagnatedObjects();
        threadLock = false;
    }

    // $: if(channelID !== "0" && channelID !== 0) {
    //     console.log("channel id is not 0");
    //     pagnatableMessages = new PagnatableMessages(channelID);
    //     newItems = pagnatableMessages.getPagnatedObjects();
    //     pagnatableMessages.pagnateForObjects(12).then(updateNewItems);
    //     chatRoomStream = new FaunaStream(null, channelID, "Channel");
    //     chatRoomStream.onUpdate.add(() => pagnatableMessages.updateObjects().then(updateNewItems));
    //
    // } else {
    //     console.log("channel id is 0");
    // }
    selectedChannelID.subscribe(value => {
        channelID = value;
        if (isInvalidChannelID()) {
            return;
        }
    });


    function isInvalidChannelID() {
        return channelID!=="0";
    }

    onMount(async () => {
        list.scrollToBottom();
    });
</script>
    <div class="vs">
        <VirtualScroll
                bind:this={list}
                data={newItems}
                key="_id"
                let:data
                on:top={pagnatableMessages.pagnateForObjects(12).then(updateNewItems)}
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