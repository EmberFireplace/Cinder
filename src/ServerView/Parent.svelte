<script>
import ServerSidebar from "./ServerSidebar.svelte";
import {ServerFaunaAPI, ServerObject} from "../FaunaWrapper.ts";
import {storedUserID} from "../store.js";
import ChannelSidebar from "./ChannelSidebar.svelte";
import {createEventDispatcher} from "svelte";

/**
 * This code is where we subscribe to all the values we have saved in our store.js file.
 */
    //All stores are prefixed with the 'stored[ValueName]' and we create values with the identifier '[valueName]'
    let userID;
    storedUserID.subscribe((value => userID=value));

/**
 * This is where we declare all the bubble down function props, so we can call functions in child components.
 */
    //These are all the props we call when we are trying to bubble down an event. They are prefixed with a 'callWhen[EventName]'
    let callWhenServerIconClick;

    //These are the props we call when we just wanna normally call functions from child components. They are prefixed with a '[UNDETERMINED]'

</script>
<div>
    <ServerSidebar on:serverIconClick={callWhenServerIconClick}/>
    <ChannelSidebar bind:onServerIconClick={callWhenServerIconClick}/>
</div>