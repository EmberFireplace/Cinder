<script>
    import CommonSplash from "../Common/CommonSplash.svelte";
    import '../../cinder-brand-styles.css'
    import HexagonButton from "../Common/HexagonButton.svelte";
</script>
<div class="center">
    <CommonSplash>
    </CommonSplash>
    <HexagonButton/>
</div>

<style>
    .center {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
</style>