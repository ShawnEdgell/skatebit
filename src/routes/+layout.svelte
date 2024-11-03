<script lang="ts">
	import '../app.css';
	import { Navbar, Footer } from '$lib';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		// Initialize theme-change globally
		themeChange(false);
	});
</script>

<div>
	<div class="flex flex-col min-h-screen w-full items-center" data-theme="light">
		<div class="fixed top-0 w-full z-10">
			<Navbar />
		</div>
		<main class="prose lg:prose-xl w-full px-4 pt-28 pb-8 overscroll-none">
			<slot />
		</main>
	</div>
	<Footer />
</div>
