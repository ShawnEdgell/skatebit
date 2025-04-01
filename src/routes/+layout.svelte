<script lang="ts">
	import '../app.css';
	import {
		AlertBar,
		ClipOfTheWeek,
		HallOfFame,
		Background,
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

<div class="flex min-h-screen flex-col">
	<!-- Header -->
	<div class="bg-base-100 sticky top-0 z-50 w-full backdrop-blur-2xl">
		<AlertBar />
		<Navbar />
	</div>

	<!-- Main Layout with Flex -->
	<div class="mx-6 flex flex-1 justify-center">
		<!-- Left Sidebar -->
		<aside class="hidden max-w-xs min-w-xs lg:block">
			<div class="sticky top-36 mr-6 h-[calc(100vh-8rem)] space-y-6 overflow-y-auto">
				<QuickLinks />
				<ClipOfTheWeek />
				<HallOfFame />
			</div>
		</aside>

		<!-- Main Content -->

		<main class="prose md:prose-lg w-full py-10 md:py-14">
			{@render children()}
		</main>

		<!-- Right Sidebar -->
		<!-- <aside class="hidden max-w-sm min-w-sm 2xl:block">
			<div class="sticky top-42 h-[calc(100vh-8rem)] space-y-6 overflow-y-auto p-6">
				<WhatsNew />
			</div>
		</aside> -->
	</div>

	<Footer />
</div>
