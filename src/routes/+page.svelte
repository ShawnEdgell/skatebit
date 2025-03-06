<script lang="ts">
	// Data loaded from the server
	export let data: { videos: YouTubeItem[] };

	import VideoItem from '$lib/components/VideoItem.svelte';
	import type { YouTubeItem } from '$lib/types/YoutubeTypes';

	const pageTitle = 'Recent News';
	const pageDescription =
		'Discover the latest official updates, news, and videos from Skater XL, Session, and Skate—all in one place.';

	const { videos } = data;

	// Define tab options for filtering the feed.
	const tabs = [
		{ id: 'all', label: 'All' },
		{ id: 'Skater XL', label: 'Skater XL' },
		{ id: 'Session', label: 'Session' },
		{ id: 'Skate', label: 'Skate' }
	];

	let selectedTab = 'all';

	// Reactive statement to filter videos based on the selected tab.
	$: filteredVideos =
		selectedTab === 'all' ? videos : videos.filter((video) => video.source === selectedTab);
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

<!-- Tab Switcher using Daisy UI -->
<div class="mt-6 flex flex-col">
	{#each tabs as tab}
		<button
			class="btn {selectedTab === tab.id ? 'btn-primary' : 'btn-base'}"
			on:click={() => (selectedTab = tab.id)}
			aria-label={tab.label}
		>
			{tab.label}
		</button>
	{/each}
</div>

<!-- News Feed Display -->
{#if filteredVideos && filteredVideos.length > 0}
	{#each filteredVideos as video (video.videoId)}
		<VideoItem {video} />
	{/each}
{:else}
	<p>No videos available.</p>
{/if}
