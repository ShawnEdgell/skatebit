<script lang="ts">
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import Popups from './Popups.svelte';

	const drawerStore = getDrawerStore();
	const openDrawer = () => drawerStore.open({ id: 'main-menu' });
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center md:place-self-center"
	slotTrail="place-content-end"
>
	<!-- Lead Slot -->
	<svelte:fragment slot="lead">
		<!-- Hamburger Icon -->
		<button class="btn pl-0 md:hidden" on:click={openDrawer}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				stroke="currentColor"
				viewBox="0 0 24 24"
				stroke-width="3"
				class="w-6 h-6"
			>
				<line x1="3" y1="6" x2="21" y2="6" />
				<line x1="3" y1="12" x2="21" y2="12" />
				<line x1="3" y1="18" x2="21" y2="18" />
			</svg>
		</button>
		<!-- Logo for larger screens -->
		<a
			href="/"
			class="hidden md:block text-2xl font-extrabold italic"
			data-sveltekit-preload-data="hover">Skatebit</a
		>
	</svelte:fragment>

	<!-- Center Title for mobile -->
	<a
		href="/"
		class="block md:hidden text-2xl font-extrabold italic"
		data-sveltekit-preload-data="hover">Skatebit</a
	>

	<!-- Trail Slot -->
	<svelte:fragment slot="trail">
		<Popups />
		<div class="p-2">
			<LightSwitch />
		</div>
	</svelte:fragment>
</AppBar>
