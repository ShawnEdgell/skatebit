<script lang="ts">
	import VideoItem from '../components/VideoItem.svelte';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';

	export let data;
	let { videos } = data;
	let tabSet: number = 0;

	const channels = [
		{ name: 'All', playlistId: 'ALL' },
		{ name: 'Skater XL', playlistId: 'UUpBQRZl7apZt_LQXKgqKQiQ' },
		{ name: 'Session', playlistId: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm' },
		{ name: 'Skate.', playlistId: 'UCSBQJEWTWOUCO65xvoDfljw' }
	];
</script>

<svelte:head>
	<link rel="preconnect" href="https://www.youtube.com" />
	<link rel="preconnect" href="https://img.youtube.com" />
	<title>Skatebit</title>
	<meta
		name="description"
		content="Discover the latest official updates, news, and videos from Skater XL, Session, Skate., and more—all in one place."
	/>
</svelte:head>

<article>
	<header>
		<h1>Recent News</h1>
	</header>

	<TabGroup active="border-b-2 border-surface-900-50-token">
		{#each channels as { name }, index}
			<Tab bind:group={tabSet} {name} value={index}>
				<span>{name}</span>
			</Tab>
		{/each}
		<svelte:fragment slot="panel">
			{#each videos as video (video.videoId)}
				<div class="mt-8">
					{#if tabSet === 0 || channels[tabSet].playlistId === video.playlistId || (channels[tabSet].playlistId === 'UCSBQJEWTWOUCO65xvoDfljw' && !video.playlistId)}
						<VideoItem {video} />
					{/if}
				</div>
			{/each}
		</svelte:fragment>
	</TabGroup>
</article>
