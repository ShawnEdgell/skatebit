<script lang="ts">
	import '../app.css';
	import {
		AlertBar,
		ClipOfTheWeek,
		HallOfFame,
		QuickLinks,
		Navbar,
		Footer,
		TableOfContents
	} from '$lib/components';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<!-- Header -->
	<div class="bg-base-100 sticky top-0 z-50 w-full">
		<AlertBar />
		<Navbar />
	</div>

	<!-- Main layout -->
	<div class="flex flex-1 justify-center px-6">
		<div class="flex w-full max-w-7xl justify-center gap-6 xl:justify-between">
			<!-- Left Sidebar -->
			<aside class="hidden w-72 xl:block">
				<div class="sticky top-28 h-[calc(100vh-7rem)] space-y-6 overflow-y-auto pr-2">
					<ClipOfTheWeek />
					<HallOfFame />
					<QuickLinks />
				</div>
			</aside>

			<!-- Main Content -->
			<main class="prose md:prose-lg mb-6 w-full">
				{@render children()}
			</main>

			<!-- Right Sidebar -->
			<aside class="hidden w-72 xl:block">
				<div class="sticky top-28 h-[calc(100vh-7rem)] space-y-6 overflow-y-auto pl-2">
					<TableOfContents />
				</div>
			</aside>
		</div>
	</div>
	<!-- Footer -->
	<Footer />
</div>
