<script>
    import {tick} from "svelte";
    import {getServerIconURLFromID} from "./ServerQuery";
    import {selectedServerID} from "./Server";
    import { watchResize } from "svelte-watch-resize";



    function handleLeftResize(node) {
        q5();
    }

    function handleMainResize(node) {
        q5();
    }

    let q1 = document.getElementsByTagName("svg");
    let q2 = 0;
    let q4 = 0;
    export let q6 = 500;
    function q5(){

        for (let i of q1) {
            q2 += i.clientWidth;
        }
        q4 = q2 / q1.length;


        console.log(q4);
        q6 = q4;
        line = createRoundedPathString([{x: 0.5*q6, y: 0}, {x: q6, y: 0.25*q6}, {x: q6, y: 0.8*q6}, {x: 0.5*q6, y: q6}, {x: 0, y: 0.8*q6}, {x: 0, y: 0.25*q6}]);

    }





    export let line = "M 3 2 L 1 3";

    export let showServer = false;
    export let serverID = null;
    function handleKeyDown() {
        selectedServerID.set(serverID);
    }
    selectedServerID.subscribe(value => {
        showServer = value === serverID;
    })
    let serverIconURL = "https://c.tenor.com/5o2p0tH5LFQAAAAj/hug.gif";
    let serverPossibleURL = getServerIconURLFromID(serverID);
    $: serverPossibleURL.then(value => serverIconURL = value);
    function createRoundedPathString(pathCoords) {
        const path = [];
        const curveRadius = 20;

        // Reset indexes, so there are no gaps
        pathCoords = pathCoords.slice();

        for (let i = 0; i < pathCoords.length; i++) {

            // 1. Get current coord and the next two (startpoint, cornerpoint, endpoint) to calculate rounded curve
            const c2Index = ((i + 1) > pathCoords.length - 1) ? (i + 1) % pathCoords.length : i + 1;
            const c3Index = ((i + 2) > pathCoords.length - 1) ? (i + 2) % pathCoords.length : i + 2;

            const c1 = pathCoords[i];
            const c2 = pathCoords[c2Index];
            const c3 = pathCoords[c3Index];

            // 2. For each 3 coords, enter two new path commands: Line to start of curve, bezier curve around corner.

            // Calculate curvePoint c1 -> c2
            const c1c2Distance = Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));
            const c1c2DistanceRatio = (c1c2Distance - curveRadius) / c1c2Distance;
            const c1c2CurvePoint = [
                ((1 - c1c2DistanceRatio) * c1.x + c1c2DistanceRatio * c2.x).toFixed(1),
                ((1 - c1c2DistanceRatio) * c1.y + c1c2DistanceRatio * c2.y).toFixed(1)
            ];

            // Calculate curvePoint c2 -> c3
            const c2c3Distance = Math.sqrt(Math.pow(c2.x - c3.x, 2) + Math.pow(c2.y - c3.y, 2));
            const c2c3DistanceRatio = curveRadius / c2c3Distance;
            const c2c3CurvePoint = [
                ((1 - c2c3DistanceRatio) * c2.x + c2c3DistanceRatio * c3.x).toFixed(1),
                ((1 - c2c3DistanceRatio) * c2.y + c2c3DistanceRatio * c3.y).toFixed(1)
            ];

            // If at last coord of polygon, also save that as starting point
            if (i === pathCoords.length - 1) {
                path.unshift('M' + c2c3CurvePoint.join(','));
            }

            // Line to start of curve (L endcoord)
            path.push('L' + c1c2CurvePoint.join(','));
            // Bezier line around curve (Q controlcoord endcoord)
            path.push('Q' + c2.x + ',' + c2.y + ',' + c2c3CurvePoint.join(','));
        }
        // Logically connect path to starting point again (shouldn't be necessary as path ends there anyway, but seems cleaner)
        path.push('Z');

        return path.join(' ');
    }







</script>


<!--<div class="img-circular" style="background-image: url('{serverIconURL}')" on:click={handleKeyDown}>-->
<!--    {#if showServer}-->
<!--        <div> hi </div>-->
<!--    {/if}-->
<!--</div> OLD CODE, IGNORE HOPEFULLY-->
<!--lmao idk-->
<div class="container-fluid">
<svg class="img-circular" id="image-fill" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 {q6} {q6}" xmlns:xlink="http://www.w3.org/1999/xlink" on:click={handleKeyDown} on:load="{q5()}" use:watchResize={handleMainResize}>

    <defs>
        <pattern id="{serverID}" x="0" y="0" height="100%" width="100%" patternUnits="userSpaceOnUse">
            <image width="100%" height="100%" xlink:href="{serverIconURL}"></image>
        </pattern>
    </defs>
    <path id="{serverID}m" d="{line}" style="stroke: rgb(0, 0, 0); stroke-linejoin:round;" fill="url('#{serverID}')" transform="matrix(1, -0.000004, 0.000004, 1, -0.001, 0.001)"></path>


</svg>
</div>

<style>
    .img-circular{


    }
</style>