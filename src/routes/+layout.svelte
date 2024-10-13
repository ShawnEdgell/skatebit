<script lang="ts">
	import '../app.postcss';
	import { initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import AppBar from '../components/AppBar.svelte';
	import Footer from '../components/Footer.svelte';
	import DrawerMenu from '../components/DrawerMenu.svelte';

	import { onMount, onDestroy } from 'svelte';

	// Initialize stores for Skeleton UI and floating UI
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();

	// Variables to track scroll and screen size
	let showAppBar = true;
	let lastScrollTop = 0;
	let isSmallScreen = window.innerWidth < 640; // Tailwind 'sm' breakpoint is 640px

	// Handle scroll events
	function handleScroll() {
		const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (isSmallScreen) {
			if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
				// Scrolling down and past 50px from the top
				showAppBar = false;
			} else if (currentScrollTop < lastScrollTop) {
				// Scrolling up
				showAppBar = true;
			}
		} else {
			// On larger screens, always show the AppBar
			showAppBar = true;
		}

		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
	}

	// Handle resize events to update isSmallScreen
	function handleResize() {
		isSmallScreen = window.innerWidth < 640;
		// Ensure AppBar is visible when resizing to larger screens
		if (!isSmallScreen) {
			showAppBar = true;
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		window.removeEventListener('scroll', handleScroll);
		window.removeEventListener('resize', handleResize);
	});
</script>

<div class="flex flex-col items-center">
	<div
		class="fixed top-0 w-full z-10 transition-transform duration-300 ease-out transform"
		class:translate-y-0={showAppBar || !isSmallScreen}
		class:-translate-y-full={!showAppBar && isSmallScreen}
	>
		<AppBar />
	</div>
	<DrawerMenu />
	<main class="prose lg:prose-xl dark:prose-invert w-full flex-1 mt-[4.5rem] px-4 py-8">
		<slot />
	</main>
	<Footer />
</div>
