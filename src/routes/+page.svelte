<script lang="ts">
	import { VideoCard } from '$lib/components';
	import type { YouTubeItem } from '$lib/types/youtube';

	export let data: { videos: YouTubeItem[] };

	const pageTitle = 'Recent News';
	const pageDescription =
		'Discover the latest official updates, news, and videos from Skater XL, Session, and Skate—all in one place.';

	const { videos } = data;

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

{#if filteredVideos && filteredVideos.length > 0}
	{#each filteredVideos as video (video.videoId)}
		<VideoCard {video} cardStyle={true} showMeta={true} showDescription={true} />
	{/each}
{:else}
	<p>No videos available.</p>
{/if}
