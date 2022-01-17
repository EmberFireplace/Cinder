<script>
    import CommonSplash from "../Common/CommonSplash.svelte";
    import '../../cinder-brand-styles.css'
    import HexagonButton from "../Common/HexagonButton.svelte";
    import HexagonMenuButtonOption from "../Common/HexagonMenuButtonOption.svelte";
    import Hexagon from "../Common/Hexagon.svelte";
    import ServerNameBar from "./ServerNameBar.svelte";



    function createServerFunc(){
        console.log("creating server");
    }

    function closeDialouge(){
        console.log("closing");
    }

</script>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="src/cinder-brand-styles.css">
</head>
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
    <div class="row">
        <div class="col-sm-5"></div>
        <div class="col-sm-7">
            <button type="button" class="btn brand-button-1" on:click={createServerFunc()}>Create Server!</button>
            <button type="button" class="btn brand-button-2" on:click={closeDialouge()}>Cancel</button>
        </div>
    </div>
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