<!-- src/routes/+page.svelte -->
<script lang="ts">
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

		<div>
			<a href="/docs/news" class="btn variant-filled-primary" data-sveltekit-preload-data="hover"
				>All Latest News</a
			>
			<a
				href="/docs/introduction"
				class="btn variant-soft-primary"
				data-sveltekit-preload-data="hover">About Skatebit</a
			>
		</div>
	</div>
</div>
