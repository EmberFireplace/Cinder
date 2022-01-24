<script>
    import Parent from "../ServerView/Parent.svelte";
    import {onMount, tick} from "svelte";
    import {writable} from "svelte/store";
    import {storedUserClient} from "../store.js";
    import {runTempToLogin} from "../Fauna/UserAuth.ts";
    import {query} from "faunadb";

    const q = query;
    let userClient = null;
    storedUserClient.subscribe((val) => userClient = val);
    tick().then(() => {
        if(userClient == null) {
        console.log("user client is null, logging in");
        runTempToLogin();
        }
        else {
            console.log("user client session in localStorage, not logging in.");
            console.log(userClient);
            console.log("trying to query")
            console.log(userClient);
        }
    });
    console.log(userClient)
</script>


<Parent/>