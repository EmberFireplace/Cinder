<script>
    let value;
</script>

<head>
    <link rel="stylesheet" href="src/cinder-brand-styles.css">
</head>
<p>Server Name (max 48 characters)</p>
<span contenteditable="true" >
    <textarea class="myTextArea dark-mode-text brand-background-color-medium-2" bind:value={value}></textarea>
</span>

<style>
    .myTextArea{
        resize: none;
        width: 100%;
        height: 5em;
        border-radius: 1em;
        -webkit-border-radius: 1em;
        -moz-border-radius: 1em;
    }
</style>