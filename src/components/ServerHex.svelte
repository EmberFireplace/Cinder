<script>
    //import * as url from 'url';

    export let imageURL = 'https://assets.codepen.io/2017/17_05_a_amur_leopard_34.jpg';
</script>

<div style>
    <div class='r-hex'>
        <div class='r-hex-inner'></div>
    </div>
    <div class='r-hex'>
        <div class='r-hex-inner'>
            <div class='r-hex-inner-2' style="--background-url: url({imageURL})"></div>
        </div>
    </div>
</div>
<style>
* { margin: 0; }
:root {
    --background-url: url(https://assets.codepen.io/2017/17_05_a_amur_leopard_34.jpg);
}
body {
    overflow: hidden;
    background: linear-gradient(90deg,
    crimson 25%, black, dodgerblue 75%);
}
.r-hex {
    overflow: hidden;
    display: inline-block;
    margin: 4em 0;
    width: 20em; height: 17.32em;
    transform: rotate(-60deg) skewX(60deg);
    border-radius: .5em;
}
.r-hex *, .r-hex *:before {
    display: block;
    overflow: hidden;
    width: inherit; height: inherit;
    border-radius: inherit;
}
.r-hex-inner {
    transform: skewX(-30deg) rotate(60deg) skewX(30deg);
    opacity: .15;
    transition: opacity .75s;
    cursor: pointer;
}
.r-hex:first-child .r-hex-inner:before, .r-hex-inner-2 {
    transform: skewX(-30deg) rotate(60deg) skewX(30deg);
    background: orange;
    content: '';
}
.r-hex-inner-2:before {
    margin-top: -1.5em;
    height: 20em;
    transform: skewX(-60deg) rotate(-90deg);
    background-size: cover;
    background: var(--background-url);
    line-height: 20em;
    text-align: center;
    content: 'Hello, be a nice kitty...';
}
.r-hex-inner:hover { opacity: 1; }
</style>