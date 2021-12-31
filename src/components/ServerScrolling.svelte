<script>
    let afewblocks = [];
    for (let i = 0; i < 30; i++) { afewblocks.push(i); }
</script>

<body id="scrollingBlock">
<div>

</div>
<div class="spacer" />
<div>
    {#each afewblocks as blk}
        <div>	Test.. <br>
        </div>
    {/each}
</div>
</body>

<style>
    .spacer { height: 10vh; }
    #scrollingBlock {
        max-width: 100px;
        max-height: 500px;
    }
    .scroll-hide ul::-webkit-scrollbar {
        width: 0 !important;
        display: none;
    }
</style>