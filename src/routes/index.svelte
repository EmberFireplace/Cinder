<script>
    import Parent from "../ServerView/Parent.svelte";
    import {onMount, tick} from "svelte";
    import {writable} from "svelte/store";
    import {storedUserClient} from "../store.js";
    import {query} from "faunadb";
    import LogoutElement from "../UserAuth/LogoutElement.svelte";
    import {browser} from "$app/env";
    import LoginElement from "../UserAuth/LoginElement.svelte";

    const q = query;
    let userClient = null;
    storedUserClient.subscribe((val) => userClient = val);
    let userNotLoggedIn = false;
    $: console.log("user not logged in val : " + userNotLoggedIn)
    storedUserClient.subscribe((val) => userNotLoggedIn = val === "null" || val === null)
    tick().then(() => {
        if(userClient === false) {
            console.log("is serverside")
            return;
        }
        console.log("user client is : " + userClient);
        console.log(typeof(userClient));
        if(userClient == null || userClient === "null") {
            console.log("user client is null, logging in");
        }
        else {
            console.log("user client session in localStorage, not logging in.");
        }
    });
</script>
{#if browser}
    {#if !userNotLoggedIn}
    <LogoutElement/>
    <Parent/>
    {:else}
    <LoginElement/>
    {/if}
{/if}