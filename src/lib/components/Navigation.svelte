<!-- src/lib/components/AppBar.svelte -->
<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import Drawer from './Drawer.svelte';
	import Popups from './Popups.svelte';
	import { page } from '$app/stores';
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
				<h1 class="h1 tracking-tight text-2xl">Skatebit</h1>
			</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<div>
			<div class="flex items-center gap-4">
				<Popups />
			</div>
		</div>
		<div>
			{#if $page.data.session}
				<a href="/account" class="btn hover:bg-primary-500/10">Account</a>
			{:else}
				<a href="/login" class="btn hover:bg-primary-500/10">Login</a>
			{/if}
		</div>
		<div>
			<LightSwitch />
		</div>
	</svelte:fragment>
</AppBar>
