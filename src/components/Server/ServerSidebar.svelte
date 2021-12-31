<script>
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import {selectedServerID} from "./Server";
    import CircularServer from "./CircularServer.svelte";
    import {tick} from "svelte";
    import {getChannelsFromServerID, getServersFromUserID, testQuery} from "./ServerQuery";
    import {varUserID} from "./Server";
    import {selectedChannelID} from "./Server";

    export let currentServerID = null;
    let userID = "319377263493644361";
    varUserID.subscribe(value => userID = value);
    let items = [];
    let promisedServerIDs = getServersFromUserID(userID);
    selectedServerID.subscribe(value => {
        currentServerID = value;
        selectedChannelID.set(0);
    })
    //This variable is to change when we async change the list as to update the dom. It's quite hacky but the best way i've found to do it.
    let reactivityMarker = null;
    {
        items = [];
        //Resets the items to nothing, eventually will change when we add cursors to the paging of server ids.
        promisedServerIDs.then(
            listOfIds => {
                //We do this for each loop instead of a spread so we can add the showServer variable to the list.
                listOfIds.forEach(myID => {
                    items.push({id: myID.id, showServer: false});
                });
                //This is where the reactivity marker updates the dom.
                reactivityMarker = 1;
            });
    }
    /*
    We do this reactivity marker thing to update the dom.
     */
    $: if(reactivityMarker===reactivityMarker) {
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

<div class="container-div">
<p>
    {currentServerID}
</p>
<section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
    {#each items as item(item.id)}
        <div animate:flip="{{duration: flipDurationMs}}" class="div-class">
            <CircularServer bind:showServer={item.showServer} serverID={item.id}/>
        </div>
    {/each}
<!--    <CreateServerIcon></CreateServerIcon>-->
</section>
</div>
<style>
    section {
        width: 240px;
        padding: 0.3em;
        border: 1px solid black;
        /* this will allow the dragged element to scroll the list */
        overflow: scroll;
        height: 100%;
    }
    .div-class {
        padding: 0.5em;
        margin: 0.25em 0;
        height: 25%;
    }
    .container-div {
        width: 100%;
    }
</style>