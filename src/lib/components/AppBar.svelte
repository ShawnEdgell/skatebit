<!-- src/lib/components/AppBar.svelte -->
<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import Drawer from './Drawer.svelte';
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	data-sveltekit-preload-data="hover"
>
	<svelte:fragment slot="lead">(lead)</svelte:fragment>
	<svelte:fragment slot="trail">
		<Drawer />
	</svelte:fragment>
</AppBar>
