<script lang="ts">
	import '../app.css';
	import {
		AlertBar,
		ClipOfTheWeek,
		HallOfFame,
		QuickLinks,
		Navbar,
		Footer,
		TableOfContents,
		Toast
	} from '$lib/components';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { toast } from '$lib/stores/toast';
	import { onDestroy, onMount } from 'svelte';

	let timeout: ReturnType<typeof setTimeout>;

	// Auto-clear toast after delay
	const unsubscribe = toast.subscribe((t) => {
		clearTimeout(timeout);
		if (t.visible) {
			timeout = setTimeout(() => {
				toast.set({ message: '', type: t.type, visible: false });
			}, 3000);
		}
	});

	// 🧠 Trigger persisted toast after navigation
	onMount(() => {
		const saved = sessionStorage.getItem('__toast');
		if (saved) {
			const data = JSON.parse(saved);
			toast.set(data);

			setTimeout(() => {
				toast.set({ message: '', type: data.type, visible: false });
			}, 3000);

			sessionStorage.removeItem('__toast');
		}
	});

	onDestroy(unsubscribe);

	// Vercel Analytics
	injectSpeedInsights();
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<!-- Toast Component (reactive with store) -->
<Toast message={$toast.message} type={$toast.type} visible={$toast.visible} />

<AlertBar />

<!-- Page Layout -->
<div class="flex min-h-screen flex-col">
	<!-- Header -->
	<div class="bg-base-100/95 sticky top-0 z-50 mb-12 w-full backdrop-blur">
		<Navbar />
	</div>

	<!-- Main Content Area -->
	<div class="flex flex-1 justify-center px-6">
		<div class="flex w-full max-w-7xl justify-center gap-6 xl:justify-between">
			<!-- Left Sidebar -->
			<aside class="hidden w-72 xl:block">
				<div class="sticky top-28 h-[calc(100vh-7rem)] space-y-6 overflow-y-auto pr-2">
					<ClipOfTheWeek />
					<HallOfFame />
					<!-- <QuickLinks /> -->
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
