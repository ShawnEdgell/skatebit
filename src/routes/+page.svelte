<!-- src/routes/+page.svelte -->
<script lang="ts">
</script>

<svelte:head>
	<title>Skatebit</title>
</svelte:head>

<div
	class=" max-w-2xl space-y-5 flex flex-col items-center justify-center sm:items-start text-center sm:text-left"
>
	<h1 class="h1 flex tracking-tighter text-4xl sm:text-6xl">
		The hub for skateboarding video games.
	</h1>

	<p>
		Skatebit is your go-to spot for exchanging tips, chatting on forums, finding guides, and
		everything else to elevate your skating experience.
	</p>

	<div>
		<a
			href="/docs/get-started"
			class="btn variant-filled-primary"
			data-sveltekit-preload-data="hover">Get Started</a
		>
		<a
			href="/docs/introduction"
			class="btn variant-filled-secondary"
			data-sveltekit-preload-data="hover">Learn More</a
		>
	</div>
</div>
