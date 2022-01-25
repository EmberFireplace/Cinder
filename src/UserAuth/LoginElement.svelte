<script>
    import {UserAuth} from "../Fauna/UserAuth.ts";

    let email;
    let password;

</script>
<p>Email</p>
<input bind:value={email}>
<p>Password</p>
<input bind:value={password}>

<button on:click={UserAuth.runLoginUser(email, password)}></button>

<style>

</style>