<script>
    import Server from "../Fauna/Server.ts";

    let serverName;
    function createServer() {
        Server.createServer(serverName, "null");
    }
</script>

<p>Create Server!</p>

<p>Server Name</p>

<input bind:value={serverName}>

<button on:click={createServer}>
    Create Server
</button>
