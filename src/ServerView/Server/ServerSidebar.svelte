<script>
    import SortableList from 'svelte-sortable-list';
    import ServerIcon from "./ServerIcon.svelte";
    import {ServerObject} from "../../FaunaWrapper.ts";
    import Server from "../../Fauna/Server.ts";



    //Server List, but needs to be named list because of the weird SortableList component.
    let list = [];
    /**
     * We get all the servers that the user with myUserID has and adds them to our list, so they are displayed in the scrollbar.
     */
    Server.paginateForServers().then(((json) => {
        //We reset the server list.
        console.log("setting servers up");
        list = [];
        let jsonServerList = json["data"];
        jsonServerList.forEach((jsonServer) => list.push(new ServerObject(jsonServer)));
        console.log("Servers list is now " + JSON.stringify(list));
    }))

    const sortList = ev =>
    {
        // let newList = ev.detail;
        // let oldList = list;
        // for(let i = 0; i < oldList.length; i++) {
        //     if(newList[i].serverID !== oldList[i].serverID) {
        //         console.log("is diff at num : " + i + ", and name is : old "
        //             + oldList[i].serverName + ", new : " + newList[i].serverName);
        //     }
        // }
        // console.log("length is " + newList.length);

        list = ev.detail


    };
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