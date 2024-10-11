<script lang="ts">
	import '../app.postcss';
	import { initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import AppBar from '../components/AppBar.svelte';
	import Footer from '../components/Footer.svelte';
	import DrawerMenu from '../components/DrawerMenu.svelte'; // Import the new DrawerMenu component

	// Initialize stores for Skeleton UI and floating UI
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();
</script>

<div class="flex flex-col items-center">
	<div class="fixed top-0 w-full z-10">
		<AppBar />
	</div>
	<DrawerMenu />
	<main class="prose lg:prose-xl dark:prose-invert w-full flex-1 mt-[4.5rem] px-4 py-8">
		<slot />
	</main>
	<Footer />
</div>
