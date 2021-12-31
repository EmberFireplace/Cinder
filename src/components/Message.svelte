
<script>
    import {readMessageFunction} from "./MessageQuery";

    export let testuser = "gamma_02";
    export let testmessage = "first";
    export let testpfp = "https://codehs.com/uploads/5a274a7c54a1f1d318bf4ed019469f6a";
    export let userID = "318895910306185289";
    let userJSON = readMessageFunction(userID);
    $: if(userID != 0) {
        userJSON.then(value => {
            testmessage = JSON.stringify(value.data.findMessageByID.message).replace(/\"/g, "");
            testuser = JSON.stringify(value.data.findMessageByID.user.username).replace(/\"/g, "");
        })
    }
</script>

<style>
    .message{
        margin-top:5px;
        margin-bottom:20px;
        color:#d5d3d6;
    }
    body{
        background-color: #2c3034;
    }
    .date+time{
        font-size: xx-small;
        color: #404249;
    }
    .username{
        font-size: large;
    }
    .username:hover{
        text-decoration: underline;
    }
    .pfp-image{
        width: 64px;
        height: 64px;
    }

</style>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</head>

<body>

<div class="container message centered" >
    <div class="row">
        <div class="col-sm-1 user-png">
            <img src="{testpfp}" width="64px" height="64px"
                 class="rounded-circle" alt="<username>'s profile picture">
        </div>
        <div class="col-sm-11">

            <span class="username"><b>{testuser}</b></span><span
                class="date+time"><sup>12/13/21 at 5:04:30</sup></span>
            <p>{testmessage}
            </p>
        </div>


    </div>
</div>



</body>
