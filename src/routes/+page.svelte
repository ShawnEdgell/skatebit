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

<aside class="alert variant-filled-warning flex flex-row items-center space-x-4 mb-6">
	<!-- Warning Icon (SVG) -->
	<div>
		<svg
			class="h-10 w-10 text-current"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
		>
			<circle cx="12" cy="17" r="1" fill="currentColor"></circle>
			<path
				d="M12 10L12 14"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
			<path
				d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
		</svg>
	</div>

	<!-- Message -->
	<div>
		<p class="m-0 font-bold text-xl lg:text-2xl">We're Making Some Changes!</p>
		<p class="mb-0 mt-2 pr-2">
			Our website is currently undergoing updates to make things easier to find. Stay tuned for
			exciting new features and improvements!
		</p>
	</div>
</aside>

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
	<hr />

	{#each videos as video (video.videoId)}
		{#if activePlaylistId === 'ALL' || activePlaylistId === video.playlistId}
			<VideoItem {video} />
		{/if}
	{/each}
</article>
