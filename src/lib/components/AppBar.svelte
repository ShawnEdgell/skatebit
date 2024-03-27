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
>
	<svelte:fragment slot="lead">
		<div class="flex gap-2">
			<div class="md:hidden">
				<Drawer />
			</div>
			<a href="/" class="flex items-center gap-1" data-sveltekit-preload-data="hover">
				<h1 class="h1 tracking-tight text-2xl">Skatebit.</h1>
			</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div>
			<div class="hidden md:flex items-center gap-4">
				<Navigation />
			</div>
		</div>
	</svelte:fragment>
</AppBar>
