<script lang="ts">
	import '../app.css';
	import { AlertBar, ClipOfTheWeek, HallOfFame, WhatsNew, Navbar, Footer } from '$lib/components';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<div class="bg-base-200 flex min-h-screen flex-col items-center">
	<AlertBar />

	<div class="bg-base-300 sticky top-0 z-50 w-full backdrop-blur">
		<Navbar />
	</div>

	<div class="4xl:justify-between px- relative my-16 flex w-full justify-center gap-6 px-4">
		<div class="hidden max-w-sm min-w-sm 2xl:block">
			<div class="rounded-box sticky top-24 space-y-6">
				<!-- Left widgets -->
			</div>
		</div>

		<main class="prose md:prose-lg bg-base-100 card w-full px-6 py-10 shadow md:py-14">
			{@render children()}
		</main>

		<div class="hidden max-w-sm min-w-sm lg:block">
			<div class="rounded-box sticky top-24 space-y-6">
				<WhatsNew />
				<ClipOfTheWeek />
				<HallOfFame />
			</div>
		</div>
	</div>
</div>

<Footer />
