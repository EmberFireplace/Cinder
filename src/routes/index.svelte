<script>
    import Parent from "../ServerView/Parent.svelte";
    import {onMount, tick} from "svelte";
    import {writable} from "svelte/store";
    import {storedUserClient} from "../store.js";
    import {runTempToLogin} from "../Fauna/UserAuth.ts";
    import {query} from "faunadb";
    import LogoutElement from "../UserAuth/LogoutElement.svelte";

    const q = query;
    let userClient = null;
    storedUserClient.subscribe((val) => userClient = val);
    //TODO::NEED TO JUST DO #IF BROWESER THING https://stackoverflow.com/questions/56636764/svelte-sapper-js-how-to-initialize-store-with-localstorage-data

    tick().then(() => {
        if(userClient === false) {
            console.log("is serverside")
            return;
        }
        console.log("user client is : " + userClient);
        if(userClient == null) {
        console.log("user client is null, logging in");
        runTempToLogin();
        }
        else {
            console.log("user client session in localStorage, not logging in.");
        }
    });
</script>
{#if process.browser}
<LogoutElement/>
<Parent/>
{/if}