<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		bgDrawer: 'bg-surface-50-900-token',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-0',
		rounded: 'none',
		position: 'right'
	};

	function openDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<button
	class="btn flex items-center justify-center p-2 rounded-full hover:bg-primary-500/10 hover:text-white transition-colors"
	on:click={openDrawer}
	data-sveltekit-preload-data="hover"
	aria-label="Open menu"
>
	<svg
		class="h-6 w-6"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M4 6h16M4 12h16m-7 6h7"
		/>
	</svg>
</button>
