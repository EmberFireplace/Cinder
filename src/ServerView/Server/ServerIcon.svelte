<script>
    import { createEventDispatcher } from 'svelte';
    import SharedConstants from "../../Fauna/SharedConstants.ts";

    /**
     * This sets up the image rendering of the server icons
     */
    export let serverObject;
    let serverURL = 'url('+"https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"+')';
    $: if(serverObject !== undefined && serverObject !== null && serverObject.serverIconURL !== "null") {
        serverURL = 'url('+serverObject.serverIconURL+')';
    } else if(serverObject !== undefined && serverObject !== null && serverObject.serverIconURL === "null") {
        serverURL = 'url('+SharedConstants.defaultMissingTextureCube+')';
    }


    /**
     * This sends events everytime the server icon is clicked.
     */
    const dispatch = createEventDispatcher();
    function sendServerIconClickEvent() {
       dispatch('serverIconClick', {
           serverObject: serverObject
       })
    }

</script>
    <p>{serverObject.serverName}</p>
    <div on:click={() => sendServerIconClickEvent()} class="circular_image" style="--image-url: {serverURL}"></div>
<style>
    .circular_image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        --image-url : url("https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif");
        background-size: cover;
        background-image: var(--image-url);
        display:inline-block;
        vertical-align:middle;
    }
</style>

