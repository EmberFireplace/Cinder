<script>
    import {updateChannel} from "../Server/Channel/ChannelQuery";

    let value = "0";
    let channelID = "0";
    let userID = "317456344595562564";
    import {varUserID} from "../Server/Server";
    varUserID.subscribe(value1 => userID = value1);
    export let temp = 0;
    import {createMessageFunction} from "../MessageQuery";

    import {selectedChannelID} from "../Server/Server";

    selectedChannelID.subscribe(value => channelID = value);

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            temp++;
            if(value !== "0" && channelID !== "0" && userID !== "0") {
                createMessageFunction(value, channelID, userID);
                updateChannel(channelID);
            }
        }
    }
</script>

<head>
    <link rel="stylesheet" href="src/cinder-brand-styles.css">
</head>
<span contenteditable="true" >
    <textarea class="myTextArea dark-mode-text brand-background-color-medium-2" on:keydown={handleKeydown} bind:value={value}></textarea>
</span>

<style>
    .myTextArea{
        resize: none;
        width: 100%;
        height: 5em;
        border-radius: 1em;
        -webkit-border-radius: 1em;
        -moz-border-radius: 1em;
    }
</style>