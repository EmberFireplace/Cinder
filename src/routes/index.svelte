<script>
    import Parent from "../ServerView/Parent.svelte";
    import {onMount, tick} from "svelte";
    import {writable} from "svelte/store";
    import {storedUserSecret} from "../store.js";
    import {Client, query} from "faunadb";
    import LogoutElement from "../UserAuth/LogoutElement.svelte";
    import {browser} from "$app/env";
    import LoginElement from "../UserAuth/LoginElement.svelte";
    import CreateNewUserElement from "../UserAuth/CreateNewUserElement.svelte";
    import CreateServerElement from "../CreateServer/CreateServerElement.svelte";

    const q = query;
    let userClient = null;
    // storedUserClient.subscribe((val) => userClient = val);
    let userNotLoggedIn = false;
    storedUserSecret.subscribe((val) => {
        userClient = new Client({
            secret: val,
            domain: 'db.us.fauna.com',
            port: 443,
            scheme: 'https',
        });
        userNotLoggedIn = val === "null" || val === null;
    })
    $: {
        if(browser) {
            if (userNotLoggedIn) {
                console.log("user is not logged in");
            } else {
                console.log("user is logged in");
            }
        }
    }
    // $: console.log("user not logged in val : " + userNotLoggedIn)
    // storedUserClient.subscribe((val) => userNotLoggedIn = val === "null" || val === null)
    // tick().then(() => {
    //     if(userClient === false) {
    //         console.log("is serverside")
    //         return;
    //     }
    //     console.log("user client is : " + userClient);
    //     console.log(typeof(userClient));
    //     if(userClient == null || userClient === "null") {
    //         console.log("user client is null, logging in");
    //     }
    //     else {
    //         console.log("user client session in localStorage, not logging in.");
    //     }
    // });
</script>
<!--
We do this browser stuff to disable serverside rendering, cause we can't store client storage tokens in the server.
-->
{#if browser}
    {#if !userNotLoggedIn}
    <LogoutElement/>
    <CreateServerElement/>
    <Parent/>
    {:else}
    <LoginElement/>
    <CreateNewUserElement/>
    {/if}
{/if}