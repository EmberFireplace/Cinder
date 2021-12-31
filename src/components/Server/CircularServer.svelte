<script>
    import {tick} from "svelte";
    import {getServerIconURLFromID} from "./ServerQuery";
    import {selectedServerID} from "./Server";

    export let showServer = false;
    export let serverID = null;
    function handleKeyDown() {
        selectedServerID.set(serverID);
    }
    selectedServerID.subscribe(value => {
        showServer = value === serverID;
    })
    let serverIconURL = "https://c.tenor.com/5o2p0tH5LFQAAAAj/hug.gif";
    let serverPossibleURL = getServerIconURLFromID(serverID);
    $: serverPossibleURL.then(value => serverIconURL = value);

</script>


<div class="img-circular" style="background-image: url('{serverIconURL}')" on:click={handleKeyDown}>
    {#if showServer}
        <div> hi </div>
    {/if}
</div>
<style>
    .img-circular{
        width: 200px;
        height: 200px;
        background-size: cover;
        display: block;
        border-radius: 100px;
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        background-color: #404249;
    }
</style>