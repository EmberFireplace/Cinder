<script>
    import ServerIcon from './ServerIcon.svelte'
    import {ServerFaunaAPI, ChannelObject} from "../FaunaWrapper.ts";
    //TODO code to check whether a server object has been updated since we last checked, if so we refresh. otherwise we use the saved data. Not going to impelemnt rn cause slightly expensive.
    //Need to make it so that we don't repagnate if we have the saved data for that - DONE


    let serverIDToChannelListMap = new Map();
    let currentChannelList = [];


    //These are the events called on from a parent's event prefixed with a 'on[EventName](ed)'
    export let onServerIconClicked = (event) => {
       console.log("server icon click recognized in ChannelSidebar");
       console.log(event.detail);
       let serverObject = event.detail.serverObject;
       console.log(serverObject);
       //If we don't already have a serverID we get the list of channels from fauna and add them to the map.
       if(!serverIDToChannelListMap.has(serverObject.serverID)) {
           ServerFaunaAPI.paginateForChannelsFromServer(serverObject.serverID).then((channelsJSON) => {
               let tempChannelList = [];
               channelsJSON["data"].forEach((channelJSON) => {
                   tempChannelList.push(new ChannelObject(channelJSON));
               })
               serverIDToChannelListMap.set(serverObject.serverID, tempChannelList);
               currentChannelList = [...serverIDToChannelListMap.get(serverObject.serverID)];
           })

       }
       //Otherwise we just set our list from the map. We can't combine this because of the async nature of getting the channels from the fauna server.
       else {
           currentChannelList = [...serverIDToChannelListMap.get(serverObject.serverID)];
       }
    };

</script>

<div></div>

<style>
    div {
        background-color: aqua;
        height: 100px;
        width: 100px;
    }
</style>