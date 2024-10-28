<script lang="ts">
	import VideoItem from '../components/VideoItem.svelte';
	import { channels } from './channelsData';

	export let data;
	let { videos } = data;
	let activePlaylistId = 'ALL';
</script>

<svelte:head>
	<link rel="preconnect" href="https://www.youtube.com" />
	<link rel="preconnect" href="https://img.youtube.com" />
	<title>Skatebit</title>
	<meta
		name="description"
		content="Discover the latest official updates, news, and videos from Skater XL, Session, Skate, and more—all in one place."
	/>
</svelte:head>

<article>
	<div class="header">
		<h1>Recent News</h1>
		<p>
			Discover the latest official updates, news, and videos from Skater XL, Session, Skate, and
			more—all in one place.
		</p>
	</div>

	<div class="flex flex-wrap mb-4">
		{#each channels as { name, playlistId }}
			<button
				on:click={() => (activePlaylistId = playlistId)}
				class="btn btn-sm lg:btn mr-2 mb-2 {activePlaylistId === playlistId
					? 'variant-filled-primary'
					: 'bg-gray-100 text-surface-800'}"
			>
				{name}
			</button>
		{/each}
	</div>
	{#each videos as video (video.videoId)}
		{#if activePlaylistId === 'ALL' || activePlaylistId === video.playlistId}
			<VideoItem {video} />
		{/if}
	{/each}
</article>
