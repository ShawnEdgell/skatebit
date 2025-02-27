<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col items-center">
	<div class="fixed top-0 z-10 w-full">
		<Navbar />
	</div>
	<main class="prose lg:prose-lg w-full overscroll-none px-4 pt-28 pb-8 lg:pt-32">
		{@render children()}
	</main>
</div>
<Footer />
