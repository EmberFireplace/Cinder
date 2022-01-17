<script>
	import ServerScrolling from "./ServerScrolling.svelte";
	import ChannelSidebarMenu from "./RightclickMenu/ChannelSidebarMenu.svelte";
	export let name;


	const testuser = "gamma_02";
	const testmessage = "first";
	const testpfp = "https://codehs.com/uploads/5a274a7c54a1f1d318bf4ed019469f6a";

	let temp = 0;

	import Message from './Message.svelte'
	import ServerHex from './ServerHex.svelte'
	import MessageBar from "./MessageBar/MessageBar.svelte";
	import ServerHexTest from "./ServerHexTest.svelte";
	import {getChannelName} from "./Server/Channel/ChannelQuery";
	import Channel from './Server/Channel/Channel.svelte';
	import ChannelSidebar from "./Server/ChannelSidebar.svelte";
	import ChannelContent from "./Server/Channel/ChannelContent.svelte";
	import CustomMenu from "./RightclickMenu/ChannelSidebarMenu.svelte";
	import ServerSidebar from "./Server/ServerSidebar.svelte";
	import ServerParent from "./Server/ServerParent.svelte";
	import ServerCreationParent from "./ServerCreation/ServerCreationParent.svelte";


</script>
<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</head>
<main>
	<div class="container">
<!--		<ServerParent/>-->

		<ServerCreationParent/>
	</div>

</main>
<!--<CustomMenu />-->
<style>
	.text-align-center{
		text-align: center;
	}
	main {
		position:relative;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
