<script lang="ts">
	import VideoItem from '../components/VideoItem.svelte';

	export let data;
	let { videos } = data;
	let activePlaylistId = 'ALL';

	const channels = [
		{ name: 'All', playlistId: 'ALL' },
		{ name: 'Skater XL', playlistId: 'UUpBQRZl7apZt_LQXKgqKQiQ' },
		{ name: 'Session', playlistId: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm' },
		{ name: 'Skate.', playlistId: 'UUSBQJEWTWOUCO65xvoDfljw' }
	];
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
	{#each channels as { name, playlistId }}
		<button
			on:click={() => (activePlaylistId = playlistId)}
			class="badge lg:btn-sm mr-2 mb-2 {activePlaylistId === playlistId
				? 'variant-filled-primary'
				: 'variant-soft-surface'}"
		>
			{name}
		</button>
	{/each}

	<header>
		<h1>Recent News</h1>
	</header>

	{#each videos as video (video.videoId)}
		{#if activePlaylistId === 'ALL' || activePlaylistId === video.playlistId}
			<hr />
			<VideoItem {video} />
		{/if}
	{/each}
</article>
