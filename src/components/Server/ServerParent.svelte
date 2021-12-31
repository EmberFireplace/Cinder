<script>

import ServerSidebar from "./ServerSidebar.svelte";
import ChannelSidebar from "./ChannelSidebar.svelte";
import ChannelContent from "./Channel/ChannelContent.svelte";
import MessageBar from "../MessageBar/MessageBar.svelte";

</script>

<div class="flex-parent">
    <div class="ss"><ServerSidebar/></div>
    <div class="cs"><ChannelSidebar/></div>
    <div class="cc"><ChannelContent/></div>
    <div class="mb"><MessageBar/></div>
</div>

<style>
    .flex-parent {
        display: grid;
        height: 90vh;
        grid-template-rows: 85% 16% 7% 10%;
        grid-template-columns: 11% auto 1fr 0%;
    }
    .ss{
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
    }
    .cs{
       grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 4;
    }
    .cc {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .mb {
        grid-column-start: 3;
        grid-column-end: 4;
        grid-row-start: 3;
        grid-row-end: 4;
    }

</style>