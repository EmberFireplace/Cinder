<script>
    import Menu from './Menu.svelte';
    import MenuOption from './MenuOption.svelte';
    import MenuDivider from './MenuDivider.svelte';
    import { tick } from 'svelte'
    import {getContext, setContext} from 'svelte';

    import Icon from './Icon.svelte'
    import {showChannelCreationPage} from "../main-store.js";
    import {deleteChannelMutation} from "../ChannelCreation/ChannelCreationQuery.ts";
    import {selectedServerID} from "../Server/Server.js";
    let serverID;
    selectedServerID.subscribe((value) => serverID = value);
    let pos = { x: 0, y: 0 };
    let showMenu = false;
    let channelID;
    export async function onRightClick(e, tempChannelID) {
        channelID = tempChannelID;
        if (showMenu) {
            showMenu = false;
            await new Promise(res => setTimeout(res, 100));
        }

        pos = { x: e.clientX, y: e.clientY };
        showMenu = true;
    }
    function closeMenu() {
        showMenu = false;
    }
    function DeleteChannel() {
        deleteChannelMutation(channelID, serverID);
    }
</script>

{#if showMenu}
    <Menu {...pos} on:click={closeMenu} on:clickoutside={closeMenu}>
        <MenuOption
                on:click={() => {showChannelCreationPage.set(true);}}
                text="Create Channel" />
        <MenuDivider/>
        <MenuOption
            on:click={() => DeleteChannel()}
            text="Delete Channel"/>
    </Menu>
{/if}

<!--<svelte:body on:contextmenu|preventDefault={onRightClick} />-->