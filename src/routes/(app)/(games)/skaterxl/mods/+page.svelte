<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import ModTabs from './ModTabs.svelte';
	import Cards from './Cards.svelte';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<span class="badge variant-filled mb-2">Skater XL</span>
	<h1 class="text-3xl font-bold mb-8">Mods</h1>
	<h2 class="text-xl font-semibold mb-2">Choosing Your Game Version</h2>
	<p class="mb-4">
		Different versions of Skater XL come with their own set of unique mods. Find out below what's
		special about each one.
	</p>
	<Cards />
	<h2 class="text-xl font-semibold mb-2">Working Mods</h2>
	<p class="mb-4">
		Please select your game version below to view a curated list of compatible modifications.
	</p>

	<ModTabs />
</div>
