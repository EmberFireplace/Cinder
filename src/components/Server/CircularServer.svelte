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


<!--<div class="img-circular" style="background-image: url('{serverIconURL}')" on:click={handleKeyDown}>-->
<!--    {#if showServer}-->
<!--        <div> hi </div>-->
<!--    {/if}-->
<!--</div> OLD CODE, IGNORE HOPEFULLY-->
<svg class="img-circular" id="image-fill" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 500 500" xmlns:xlink="http://www.w3.org/1999/xlink" on:click={handleKeyDown}>

    <defs>
        <pattern id="{serverID}" x="0" y="0" height="100%" width="100%" patternUnits="userSpaceOnUse">
            <image width="100%" height="100%" xlink:href="{serverIconURL}"></image>
        </pattern>
    </defs>
    <path d="M 250 0 l 250 125 l 0 250 l -250 125 l -250 -125 l 0 -250 Z" style="stroke: rgb(0, 0, 0);" fill="url('#{serverID}')" transform="matrix(1, -0.000004, 0.000004, 1, -0.001, 0.001)"></path>


</svg>
<style>
    .img-circular{


    }
</style>