<!-- src/lib/components/AppBar.svelte -->
<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import Drawer from './Drawer.svelte';
	import Navigation from './Navigation.svelte';
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	data-sveltekit-preload-data="hover"
	padding="p-4"
>
	<svelte:fragment slot="lead">
		<a href="/" class="flex items-center gap-1">
			<svg
				fill="currentColor"
				width="36px"
				height="36px"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				data-name="Layer 1"
				><path
					d="M9,15a1,1,0,1,0,1,1A1,1,0,0,0,9,15ZM2,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,2,14Zm20,0a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,22,14ZM17,7H13V5.72A2,2,0,0,0,14,4a2,2,0,0,0-4,0,2,2,0,0,0,1,1.72V7H7a3,3,0,0,0-3,3v9a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V10A3,3,0,0,0,17,7ZM13.72,9l-.5,2H10.78l-.5-2ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V10A1,1,0,0,1,7,9H8.22L9,12.24A1,1,0,0,0,10,13h4a1,1,0,0,0,1-.76L15.78,9H17a1,1,0,0,1,1,1Zm-3-4a1,1,0,1,0,1,1A1,1,0,0,0,15,15Z"
				/></svg
			>
			<h1 class="h1 tracking-tighter text-2xl">Skatebit.</h1>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div class="sm:hidden">
			<Drawer />
		</div>

		<div class="hidden sm:flex items-center">
			<Navigation />
			<div class="ml-4">
				<LightSwitch />
			</div>
		</div>
	</svelte:fragment>
</AppBar>
