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
	padding="py-2 px-4"
>
	<svelte:fragment slot="lead">
		<a href="/" class="flex items-center gap-1">
			<h1 class="h1 tracking-tighter text-xl">Skatebit.</h1>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div>
			<div class="sm:hidden">
				<Drawer />
			</div>

			<div class="hidden sm:flex items-center gap-4">
				<Navigation />
				<div class="ml-4">
					<LightSwitch />
				</div>
			</div>
		</div></svelte:fragment
	>
</AppBar>
