<script>
    import Parent from "../ServerView/Parent.svelte";
    import {onMount, tick} from "svelte";
    import {writable} from "svelte/store";
    import {storedUserClient} from "../store.js";
    import {runTempToLogin} from "../Fauna/UserAuth.ts";
    import {query} from "faunadb";
    import LogoutElement from "../UserAuth/LogoutElement.svelte";
    import {browser} from "$app/env";

    const q = query;
    let userClient = null;
    storedUserClient.subscribe((val) => userClient = val);

    tick().then(() => {
        if(userClient === false) {
            console.log("is serverside")
            return;
        }
        console.log("user client is : " + userClient);
        console.log(typeof(userClient));
        if(userClient == null || userClient === "null") {
        console.log("user client is null, logging in");
        runTempToLogin();
        }
        else {
            console.log("user client session in localStorage, not logging in.");
        }
    });
</script>
{#if browser}
<LogoutElement/>
<Parent/>
{/if}