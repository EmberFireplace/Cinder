<script>
    import {getChannelName} from './ChannelQuery';
    export let channelID;
    let channelName = null;
    let asyncChannelName = getChannelName(channelID);
    $: asyncChannelName.then(value => channelName = value);


</script>


<div>
    {channelName}
</div>
