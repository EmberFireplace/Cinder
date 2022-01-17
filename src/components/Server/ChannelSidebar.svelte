<script>
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import {getChannelsFromServerID} from "./ServerQuery";
    import {tick} from "svelte";
    import {selectedChannelID} from "./Server";
    import {selectedServerID} from "./Server";
    import {getContext} from 'svelte';
    import ChannelSidebarMenu from "../RightclickMenu/ChannelSidebarMenu.svelte";
    import ChannelEditSidebarMenu from "../RightclickMenu/ChannelEditSidebarMenu.svelte";
    let referenceVar;
    let secondReferenceVar;

    export let serverID = null;
    let items = [];
    $: console.log("from channel sidebar : " + serverID);
    let possibleChannels = null;
    let reactivityMarker = 0;



    selectedServerID.subscribe(value => {
        serverID = value;
        reactivityMarker = 0; //After we set the value we have to set the reactivty marker to reset the dom.
    })

    function handleClick(id) {
        console.log("id is : " + id);
        selectedChannelID.set(id);
    }
    $:{
        items = [];
        getChannelsFromServerID(serverID).then(
            value => {
                let temp = [...value];
                console.log(temp);
                while(items.length !== 0) {
                    items.pop();
                }
                temp.forEach(myID => {
                    items.push({id: myID._id, name: myID.channelName});
                });
                console.log(items.length);
                reactivityMarker = 1;
            });
    }
    $: if(reactivityMarker==reactivityMarker) {
        items = items;
    }
    const flipDurationMs = 300;
    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }
</script>

<style>
    section {
        width: 100%;
        background-color: #5e514f;
        /*padding: 0.3em;*/
        /*border: 1px solid black;*/
        /* this will allow the dragged element to scroll the list */
        /*overflow: scroll;*/
        height: 100%;
        min-height: 80vh;
    }
    div {
        width: 100%;
        /*padding: 0.2em;*/
        /*border: 1px solid blue;*/
        /*margin: 0.15em 0;*/
        font-size: larger;
    }
</style>

<ChannelSidebarMenu bind:this={referenceVar}/>
<div on:contextmenu|preventDefault={(e) => {referenceVar.onRightClick(e); if(secondReferenceVar != null) {secondReferenceVar.closeMenu()}}}>
<section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
    {#each items as item(item.id)}
            <div animate:flip="{{duration: flipDurationMs}}" on:click={handleClick(item.id)}>
                <ChannelEditSidebarMenu bind:this={secondReferenceVar}/>
                <div on:contextmenu|preventDefault={(e) => secondReferenceVar.onRightClick(e)}>
                    {item.name}</div>
        </div>
    {/each}
</section>
</div>
