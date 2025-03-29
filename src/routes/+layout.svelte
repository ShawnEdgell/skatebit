<script lang="ts">
	import '../app.css';
	import AlertBar from '$lib/components/AlertBar.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col items-center">
	<AlertBar />
	<div class="sticky top-0 z-50 w-full">
		<Navbar />
	</div>

	<div class="flex w-full justify-center">
		<!-- Sticky Left Sidebar -->
		<!-- <div
			class="bg-base-300 sticky top-16 hidden h-fit max-h-[calc(100vh-4rem)] w-xs overflow-y-auto px-4 pt-6 pb-8 lg:block"
		>
			Left Sidebar
		</div> -->

		<!-- Main Content -->
		<main class="prose lg:prose-lg w-full px-4 pt-12 pb-8 lg:pt-16">
			{@render children()}
		</main>

		<!-- Sticky Right Sidebar -->
		<!-- <div
			class="bg-base-300 sticky top-16 hidden h-fit max-h-[calc(100vh-4rem)] w-xs overflow-y-auto px-4 pt-6 pb-8 lg:block"
		>
			Right Sidebar
		</div> -->
	</div>
</div>

<Footer />
