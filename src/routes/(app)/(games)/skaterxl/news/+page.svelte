<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import NewsFeed from './NewsFeed.svelte';
</script>

<svelte:head>
	<title>Skatebit | Skater XL News</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }} class="max-w-4xl mx-auto">
	<span class="badge variant-filled mb-2">Skater XL</span>
	<h1 class="text-3xl font-bold mb-8">News</h1>
	<NewsFeed />
</div>
