<script lang="ts">
	// Data loaded from the server
	export let data: { videos: YouTubeItem[] };

	import VideoItem from '$lib/components/VideoItem.svelte';
	import type { YouTubeItem } from '$lib/types/YoutubeTypes';

	const pageTitle = 'Recent News';
	const pageDescription =
		'Discover the latest official updates, news, and videos from Skater XL—all in one place.';

	const { videos } = data;
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

{#if videos && videos.length > 0}
	{#each videos as video}
		<VideoItem {video} />
	{/each}
{:else}
	<p>No videos available.</p>
{/if}
