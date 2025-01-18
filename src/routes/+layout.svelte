<script lang="ts">
	import '../app.css';
	import { Navbar, Footer } from '$lib';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	onMount(() => {
		// Initialize theme-change globally
		themeChange(false);
	});

	injectAnalytics();
</script>

<div class="flex flex-col min-h-screen w-full items-center">
	<div class="fixed top-0 w-full z-10">
		<Navbar />
	</div>
	<main class="prose md:prose-xl w-full px-4 pt-28 md:pt-32 pb-8 overscroll-none">
		<slot />
	</main>
</div>
<Footer />
