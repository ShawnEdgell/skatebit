<!-- src/routes/+page.svelte -->
<script lang="ts">
</script>

<svelte:head>
	<title>Skatebit</title>
</svelte:head>

<div
	class="max-w-4xl space-y-5 flex flex-col items-center justify-center sm:items-start text-center sm:text-left"
>
	<h1 class="h1 flex tracking-tight text-5xl sm:text-6xl">
		The hub for skateboarding video games.
	</h1>

	<p class="text-lg">
		Skatebit is your go-to spot for exchanging tips, chatting on forums, finding guides, and
		everything else to elevate your skating experience.
	</p>

	<div>
		<a
			href="/docs/introduction"
			class="btn variant-filled-primary"
			data-sveltekit-preload-data="hover">Learn More</a
		>
		<a href="/docs/news" class="btn variant-soft-primary" data-sveltekit-preload-data="hover"
			>Latest News</a
		>
	</div>
</div>
