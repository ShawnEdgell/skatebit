<script lang="ts">
	import { VideoNewsItem } from '$lib/components';
	import type { YouTubeItem } from '$lib/types/youtube';

	export let data: { videos: YouTubeItem[] };

	const pageTitle = 'Recent News';
	const pageDescription =
		'Discover the latest official updates, news, and videos from Skater XL, Session, and Skate—all in one place.';

	const { videos } = data;

	const tabs = [
		{ id: 'all', label: 'All' },
		{ id: 'Skater XL', label: 'Skater XL' },
		{ id: 'Session', label: 'Session' },
		{ id: 'Skate', label: 'Skate' }
	];

	let selectedTab = 'all';

	$: filteredVideos =
		selectedTab === 'all' ? videos : videos.filter((video) => video.source === selectedTab);
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

<!-- <div class="mt-6 flex flex-col">
	{#each tabs as tab}
		<button
			class="btn {selectedTab === tab.id ? 'btn-primary  ' : 'btn-base'}"
			on:click={() => (selectedTab = tab.id)}
			aria-label={tab.label}
		>
			{tab.label}
		</button>
	{/each}
</div> -->

{#if filteredVideos && filteredVideos.length > 0}
	{#each filteredVideos as video (video.videoId)}
		<VideoNewsItem {video} />
	{/each}
{:else}
	<p>No videos available.</p>
{/if}
