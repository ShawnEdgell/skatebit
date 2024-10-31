<script lang="ts">
	import '../app.postcss';
	import {
		initializeStores,
		storePopup,
		Modal,
		Toast,
		TableOfContents,
		tocCrawler
	} from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import AppBar from '../components/AppBar.svelte';
	import Footer from '../components/Footer.svelte';
	import DrawerMenu from '../components/DrawerMenu.svelte'; // Import the new DrawerMenu component

	// Initialize stores for Skeleton UI and floating UI
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();
</script>

<Toast />
<Modal />
<DrawerMenu />

<div class="flex flex-col items-center h-full">
	<div class="fixed top-0 w-full z-10">
		<AppBar />
	</div>
	<main class="prose lg:prose-xl dark:prose-invert w-full flex-1 mt-[2.5rem] px-4 py-12">
		<slot />
	</main>
	<Footer />
</div>
