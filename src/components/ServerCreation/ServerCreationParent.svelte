<script>
    import CommonSplash from "../Common/CommonSplash.svelte";
    import '../../cinder-brand-styles.css'
    import HexagonButton from "../Common/HexagonButton.svelte";
    import HexagonMenuButtonOption from "../Common/HexagonMenuButtonOption.svelte";
    import Hexagon from "../Common/Hexagon.svelte";
    import ServerNameBar from "./ServerNameBar.svelte";
</script>
<div class="center">
    <div class="row align-items-end">
        <div class="col-sm-3"><Hexagon/></div>
        <div class="col-sm-9"><ServerNameBar/></div>
    </div>
    <div class="row">
        <div class="col"><HexagonMenuButtonOption firstOption="13+" secondOption="18+"/></div>
    </div>
    <div class="row align-items-center">
        <div class="col"><HexagonMenuButtonOption firstOption="Public" secondOption="Private"/></div>
    </div>
    <div class="row"><p>Read our Server Getting Started Guide Woooo!!!</p></div>
</div>

<style>
    .row {
        padding-bottom: 3em;
    }
    .center {
        background: #3c312c;
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        min-height: 80vh;
        min-width: 100vh;
        border-radius: 1.5em;
        padding-top: 4.5em;
        padding-left: 3em;
        padding-right: 3em;
    }
</style>