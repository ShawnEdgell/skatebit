<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		bgDrawer: 'bg-surface-900 text-white',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-0',
		rounded: 'none',

		position: 'right'
	};

	function openDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<button class="btn btn-sm variant-filled" on:click={openDrawer} data-sveltekit-preload-data="hover">
	<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"
		></path>
	</svg>
</button>
