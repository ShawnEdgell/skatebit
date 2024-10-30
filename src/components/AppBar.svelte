<script lang="ts">
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import Popups from './Popups.svelte';

	const drawerStore = getDrawerStore();

	// Drawer settings for custom styles
	const drawerSettings = {
		id: 'main-menu', // Make sure this matches the ID in your layout
		bgDrawer: 'bg-surface-50-900-token',
		bgBackdrop: 'bg-gradient-to-tr from-surface-500/50 via-surface-500/50 to-surface-500/50',
		width: 'w-[280px] md:w-[480px]'
	};

	const openDrawer = () => drawerStore.open(drawerSettings);
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center md:place-self-center"
	slotTrail="place-content-end"
>
	<!-- Lead Slot -->
	<svelte:fragment slot="lead">
		<!-- Hamburger Icon -->
		<button class="md:hidden" on:click={openDrawer}>
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
			class="btn p-0 hidden md:flex items-center text-2xl font-extrabold italic"
			data-sveltekit-preload-data="hover"
		>
			Skatebit
		</a>
	</svelte:fragment>

	<!-- Center Title for mobile -->
	<a
		href="/"
		class="block btn p-0 md:hidden text-2xl font-extrabold italic"
		data-sveltekit-preload-data="hover">Skatebit</a
	>

	<!-- Trail Slot -->
	<svelte:fragment slot="trail">
		<Popups />
		<LightSwitch />
	</svelte:fragment>
</AppBar>
