<script lang="ts">
	import '../app.css';
	import { Navbar, Footer } from '$lib';
</script>

<div>
	<div data-theme="light" class="flex flex-col min-h-screen w-full items-center">
		<div class="fixed top-0 w-full z-10">
			<Navbar />
		</div>
		<main class="prose lg:prose-xl w-full px-4 pt-28 pb-8 overscroll-none">
			<slot />
		</main>
	</div>
	<Footer />
</div>
