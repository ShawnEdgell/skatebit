<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div class="space-y-5" use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<h1 class="text-3xl font-bold mb-8">Stats</h1>
	<h2 class="text-xl font-semibold mb-2">Choosing Your Game Version</h2>
	<p class="mb-4">
		Different versions of Skater XL come with their own set of unique mods. Find out below what's
		special about each one.
	</p>

	<div class="flex gap-4"></div>
	<h2 class="text-xl font-semibold mb-2">Working Mods</h2>
	<p class="mb-4">
		Please select your game version below to view a curated list of compatible modifications.
	</p>
</div>
