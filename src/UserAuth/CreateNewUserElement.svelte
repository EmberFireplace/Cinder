<script>
    import {UserAuth} from "../Fauna/UserAuth.ts";

    let username;
    let email;
    let password;
</script>
<p>Create New User</p>
<p>Username</p>
<input bind:value={username}>
<p>Email</p>
<input bind:value={email}>
<p>Password</p>
<input bind:value={password}>

<button on:click={UserAuth.createNewUser(username, email, password, null)}></button>
