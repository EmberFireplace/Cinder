<script>

    import {UserAuth} from "../Fauna/UserAuth.ts";

    function logoutUser() {
        UserAuth.logoutUser();
    }
</script>

<button on:click={logoutUser}>
    Logout
</button>
