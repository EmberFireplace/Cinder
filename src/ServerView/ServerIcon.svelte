<script>
    import {ServerObject} from "../FaunaWrapper.ts";
    import { createEventDispatcher } from 'svelte';

    /**
     * This sets up the image rendering of the server icons
     */
    export let serverObject;
    let serverURL = 'url('+"https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"+')';
    $: if(serverObject !== undefined && serverObject !== null) {
        serverURL = 'url('+serverObject.serverIconURL+')';
    }

    /**
     * This sends events everytime the server icon is clicked.
     */
    const dispatch = createEventDispatcher();
    function sendServerIconClickedEvent() {
       dispatch('serverIconClicked', {
           serverObject: serverObject
       })
    }

</script>
    <div on:click={() => sendServerIconClickedEvent()} class="circular_image" style="--image-url: {serverURL}"></div>
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

