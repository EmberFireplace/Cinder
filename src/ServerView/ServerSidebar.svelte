<script>
    import SortableList from 'svelte-sortable-list';
    import ServerIcon from "./ServerIcon.svelte";
    import {storedUserID} from "../store.js";
    import {ServerFaunaAPI, ServerObject} from "../FaunaWrapper.ts";

    /**
     * Syncs up the userID from our store.js file
     */
    let userID;
    storedUserID.subscribe((value => userID=value));

    //Server List, but needs to be named list because of the weird SortableList component.
    let list = [];
    /**
     * We get all the servers that the user with myUserID has and adds them to our list, so they are displayed in the scrollbar.
     */
    ServerFaunaAPI.paginateForServersFromUser(userID).then(((json) => {
        //We reset the server list.
        list = [];
        let jsonServerList = json["data"];
        jsonServerList.forEach((jsonServer) => list.push(new ServerObject(jsonServer)));
    }))

    const sortList = ev => {list = ev.detail};
</script>
<!--
A list of all the servers listed with their icon, and you can click on them to activate their channels.
-->
<SortableList
        {list}
        key="serverID"
        on:sort={sortList}
        let:item
        let:index>
    <ServerIcon on:serverIconClick serverObject="{list[index]}"/>
</SortableList>