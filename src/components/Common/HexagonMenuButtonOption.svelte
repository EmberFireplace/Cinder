<script>
    import HexagonButton from "./HexagonButton.svelte";

    export let firstOption = "option1";
    export let secondOption = "option2";
    export let toggledToFirst;
</script>
<div class="row align-items-center">
    <div class="col-sm-2">{firstOption}</div>
    <div class="col-sm-3"><HexagonButton class="middle" bind:on={toggledToFirst}/></div>
    <div class="col-sm-1">{secondOption}</div>
</div>

