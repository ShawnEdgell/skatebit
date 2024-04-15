<!-- src/routes/+page.svelte -->
<script lang="ts">
</script>

<svelte:head>
	<title>Skatebit</title>
</svelte:head>

<div class="h-full w-full flex justify-center items-center text-center sm:text-left p-4">
	<div class="max-w-4xl space-y-5">
		<a
			href="/skaterxl/about"
			class="badge variant-filled-tertiary"
			data-sveltekit-preload-data="hover">Skater XL</a
		>
		<a href="/session/about" class="badge variant-filled-error" data-sveltekit-preload-data="hover"
			>Session</a
		>
		<a href="/skate/about" class="badge variant-filled-warning" data-sveltekit-preload-data="hover"
			>Skate.</a
		>
		<a
			href="/bmxstreets/about"
			class="badge variant-filled-surface"
			data-sveltekit-preload-data="hover">BMX Streets</a
		>
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
		<a href="/forums" class="btn variant-soft-primary" data-sveltekit-preload-data="hover">Forums</a
		>
	</div>
</div>
