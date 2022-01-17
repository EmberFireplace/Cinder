<script>
    import '../../cinder-brand-styles.css'
    import ChannelNameBar from "./ChannelNameBar.svelte";
    import {showChannelCreationPage} from "../main-store.js";
    import clickOutside from 'svelte-outside-click';
    import {createChannelMutation} from "./ChannelCreationQuery.ts";
    import {selectedServerID} from "../Server/Server.js";
    let switcher = false;
    let channelName;
    let serverID;
    selectedServerID.subscribe((value) => serverID = value);
    let showCreateChannelPage = false;
    showChannelCreationPage.subscribe((value) => showCreateChannelPage = value);
    function clickOutsideFunc() {
          switcher = !switcher;
          if(!switcher) {
                showChannelCreationPage.set(false);
          }
    }
    function onButtonClick() {
          showChannelCreationPage.set(false);
          createChannelMutation(channelName, serverID);
    }
</script>
<div></div>
{#if showCreateChannelPage}
<div class="center" use:clickOutside={clickOutsideFunc}>
      <p>Create A Text Channel</p>
      <ChannelNameBar bind:value={channelName}/>
      <button on:click={onButtonClick}></button>
</div>
{/if}

<style>
    .row {
        padding-bottom: 3em;
    }
    .center {
        background: #3c312c;
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        min-height: 80vh;
        min-width: 100vh;
        border-radius: 1.5em;
        padding-top: 4.5em;
        padding-left: 3em;
        padding-right: 3em;
    }
</style>