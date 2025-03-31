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

<div class="flex min-h-screen flex-col">
	<div class="bg-base-100 sticky top-0 z-50 w-full shadow-lg">
		<AlertBar />
		<Navbar />
	</div>

	<div class="grid lg:grid-cols-[auto_1fr]">
		<!-- Sidebar -->
		<aside class="bg-base-100 col-span-1 hidden max-w-xs min-w-sm lg:block">
			<div class="sticky top-32 h-[calc(100vh-8rem)] space-y-6 overflow-y-auto p-6">
				<WhatsNew />
				<ClipOfTheWeek />
				<HallOfFame />
				<QuickLinks />
			</div>
		</aside>
		<!-- Main -->

		<div class="flex w-full justify-center">
			<main class="prose md:prose-lg mx-6 w-full py-10 md:py-14">
				{@render children()}
			</main>
		</div>
	</div>
</div>
<Footer />
