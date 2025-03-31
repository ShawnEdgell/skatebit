<script lang="ts">
	import '../app.css';
	import AlertBar from '$lib/components/AlertBar.svelte';
	import CoTwWidget from '$lib/components/CoTWWidget.svelte';
	import HallOfFame from '$lib/components/HallOfFame.svelte';
	import WhatsNewWidget from '$lib/components/WhatsNewWidget.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Background from '$lib/components/Background.svelte';

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<!-- <div class="fixed inset-0 -z-10">
	<Background />
</div> -->

<div class="flex min-h-screen flex-col items-center">
	<AlertBar />

	<!-- Sticky Navbar -->
	<div class="bg-base-200 sticky top-0 z-50 w-full">
		<Navbar />
	</div>

	<!-- Layout container -->
	<div class="relative flex w-full justify-center 2xl:justify-between">
		<!-- Left Sidebar (Sticky) -->
		<div class="hidden max-w-sm min-w-sm px-4 pt-6 pb-8 2xl:block">
			<div class="sticky top-24 space-y-6">
				<!-- Add any left widgets here if needed -->
			</div>
		</div>

		<!-- Main Content -->
		<main class="prose md:prose-lg w-full px-4 pt-12 pb-8 md:pt-16">
			{@render children()}
		</main>

		<!-- Right Sidebar (Sticky) -->
		<div class="hidden max-w-sm min-w-sm px-4 pt-6 pb-8 2xl:block">
			<div class="sticky top-24 space-y-6">
				<WhatsNewWidget />
				<CoTwWidget />
				<HallOfFame />
			</div>
		</div>
	</div>
</div>

<Footer />
