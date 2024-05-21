<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Cards from '$lib/components/Cards.svelte';
</script>

<svelte:head>
	<title>Skatebit</title>
</svelte:head>

<div class="h-full w-full flex justify-center items-center text-center sm:text-left p-4">
	<div class="max-w-4xl space-y-5">
		<h1 class="h1 tracking-tight text-4xl sm:text-6xl">
			The hub for skateboarding and BMX gaming.
		</h1>

		<p class="text-lg">
			Skatebit is your go-to spot for exchanging tips, chatting on forums, finding guides, and
			everything else to elevate your gaming experience.
		</p>

		<a href="/news" class="btn variant-filled-primary" data-sveltekit-preload-data="hover"
			>Latest News</a
		>
		<a href="/info" class="btn variant-soft-primary" data-sveltekit-preload-data="hover"
			>Getting Started</a
		>
		<div class="p-0 pt-2">
			<Cards />
		</div>
	</div>
</div>
