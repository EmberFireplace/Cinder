<script>
    //Is set in the ChannelSidebar component.
    import {createEventDispatcher} from "svelte";

    export let channelObject;
    /**
     * This sends events everytime the server icon is clicked.
     */
    const dispatch = createEventDispatcher();
    function sendChannelElementClickEvent() {
        dispatch('channelElementClick', {
            channelObject: channelObject
        })
    }
</script>

<div on:click={() => {console.log(channelObject.channelID); sendChannelElementClickEvent();}}>
    <p>{channelObject.channelName}</p>
</div>

<style>

</style>