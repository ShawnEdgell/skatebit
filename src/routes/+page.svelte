<script lang="ts">
	import { pageHeader, VideoItem } from '$lib';
	import type { YouTubeItem } from '$lib';

	const { title, description, heading } = pageHeader.news;

	// Define the expected data structure
	export let data: { videos: YouTubeItem[] };
	const { videos } = data;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<header>
	<h1>{heading}</h1>
	<p>{description}</p>
	<hr />
</header>

<main>
	<article>
		{#if videos.length > 0}
			{#each videos as video (video.videoId)}
				<VideoItem {video} />
			{/each}
		{:else}
			<p>No videos available at the moment.</p>
		{/if}
	</article>
</main>
