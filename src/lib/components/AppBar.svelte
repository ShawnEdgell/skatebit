<!-- src/lib/components/AppBar.svelte -->
<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import Drawer from './Drawer.svelte';
	import Navigation from './Navigation.svelte';
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	data-sveltekit-preload-data="hover"
	padding="p-3"
>
	<svelte:fragment slot="lead">
		<a href="/" class="flex items-center gap-1" data-sveltekit-preload-data="hover">
			<h1 class="h1 tracking-tighter text-2xl">Skatebit.</h1>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div>
			<div class="sm:hidden">
				<Drawer />
			</div>

			<div class="hidden sm:flex items-center gap-4">
				<Navigation />
			</div>
		</div>
	</svelte:fragment>
</AppBar>
