<script lang="ts">
	import '../app.css';
	import {
		AlertBar,
		Background,
		ClipOfTheWeek,
		HallOfFame,
		WhatsNew,
		QuickLinks,
		Navbar,
		Footer
	} from '$lib/components';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<div class="fixed top-0 -z-10 h-full w-full">
	<Background />
</div>

<div class="flex min-h-screen flex-col items-center">
	<AlertBar />

	<div class="bg-base-200 sticky top-0 z-50 w-full backdrop-blur">
		<Navbar />
	</div>

	<div class="relative my-6 flex w-full justify-center gap-6 px-6">
		<div class="hidden max-w-xs min-w-xs xl:block">
			<div class="rounded-box sticky top-24 space-y-6">
				<WhatsNew />
				<QuickLinks />
			</div>
		</div>

		<main class="prose md:prose-lg card bg-base-100 w-full px-6 py-10 md:py-14">
			{@render children()}
		</main>

		<div class="hidden max-w-xs min-w-xs xl:block">
			<div class="rounded-box sticky top-24 space-y-6">
				<ClipOfTheWeek />
				<HallOfFame />
			</div>
		</div>
	</div>
</div>

<Footer />
