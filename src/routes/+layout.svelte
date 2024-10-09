<script lang="ts">
	import '../app.postcss';
	import { initializeStores, Drawer, getDrawerStore, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import AppBar from '../components/AppBar.svelte';
	import Footer from '../components/Footer.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();

	const drawerStore = getDrawerStore();

	// Define the function to close the drawer
	function closeDrawer() {
		drawerStore.close();
	}

	// Navigation items array
	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/guides', label: 'Guides' },
		{ href: '/mods', label: 'Mods' },
		{ href: '/links', label: 'Helpful Links' },
		{ href: '/stats', label: 'Stats & Settings' }
	];
</script>

<Drawer>
	<ul class="p-6 space-y-4">
		{#each navItems as { href, label }}
			<li>
				<a {href} class="btn btn-lg font-semibold w-full variant-ghost" on:click={closeDrawer}>
					{label}
				</a>
			</li>
		{/each}
	</ul>
</Drawer>

<div class="flex flex-col items-center min-h-screen">
	<div class="fixed top-0 w-full z-10">
		<AppBar />
	</div>
	<main class="prose lg:prose-xl dark:prose-invert w-full flex-1 mt-[4.5rem] px-4 py-8">
		<slot />
	</main>
	<Footer />
</div>
