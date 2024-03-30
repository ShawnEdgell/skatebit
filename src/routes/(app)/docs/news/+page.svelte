<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { tocCrawler } from '@skeletonlabs/skeleton';

	interface YouTubeVideoItem {
		snippet: {
			title: string;
			publishedAt: string;
			description: string;
			resourceId: { videoId: string };
		};
	}

	interface ExtendedVideoItem {
		title: string;
		publishedAt: string;
		description: string;
		videoUrl: string;
		playlistId: string;
		showFullDescription: boolean; // Add this property
	}

	const channels = [
		{ name: 'All', playlistId: 'ALL' },
		{ name: 'Skater XL', playlistId: 'UUpBQRZl7apZt_LQXKgqKQiQ' },
		{ name: 'Session', playlistId: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm' },
		{ name: 'Skate.', playlistId: 'UUSBQJEWTWOUCO65xvoDfljw' }
	];

	const videos = writable<ExtendedVideoItem[]>([]);
	const activePlaylistId = writable('ALL');
	const apiKey = import.meta.env.VITE_YT_API_KEY;

	onMount(async () => {
		const channelPromises = channels
			.filter((channel) => channel.playlistId !== 'ALL')
			.map((channel) => fetchVideos(channel.playlistId));

		const allVideos = await Promise.all(channelPromises);
		videos.set(
			allVideos
				.flat()
				.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
		);
	});

	async function fetchVideos(playlistId: string): Promise<ExtendedVideoItem[]> {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${apiKey}`
		);
		const data = await response.json();
		return data.items
			.filter((item: YouTubeVideoItem) => item.snippet.description.trim().length > 0)
			.map((item: YouTubeVideoItem) => ({
				title: item.snippet.title,
				publishedAt: item.snippet.publishedAt,
				description: item.snippet.description,
				videoUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
				playlistId,
				showFullDescription: false // Initialize showFullDescription to false
			}));
	}

	function toggleNews(playlistId: string) {
		activePlaylistId.set(playlistId);
	}
</script>

<svelte:head>
	<title>Skatebit | News</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div>
			{#each channels as { name, playlistId }}
				<button
					on:click={() => toggleNews(playlistId)}
					class="badge mr-1 mb-2
                    {playlistId === $activePlaylistId
						? name === 'All'
							? 'variant-filled-primary'
							: name === 'Skater XL'
								? 'variant-filled-tertiary'
								: name === 'Session'
									? 'variant-filled-error'
									: name === 'Skate.'
										? 'variant-filled-warning'
										: ''
						: name === 'All'
							? 'variant-outline-primary'
							: name === 'Skater XL'
								? 'variant-outline-tertiary'
								: name === 'Session'
									? 'variant-outline-error'
									: name === 'Skate.'
										? 'variant-outline-warning'
										: ''}"
				>
					{name}
				</button>
			{/each}
			<h1>News</h1>
			<p>All the latest updates, breaking news, and insider insights.</p>
			<hr class="border-t-2 my-2" />
		</div>
		{#each $videos as video}
			{#if $activePlaylistId === 'ALL' || $activePlaylistId === video.playlistId}
				<div>
					<h2 class="h2">{video.title}</h2>
					<p class="text-sm">
						{new Date(video.publishedAt).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric'
						})}
					</p>
					{#if video.showFullDescription}
						<p>{video.description}</p>
						<button
							on:click={() => (video.showFullDescription = false)}
							class="text-tertiary-500 hover:underline mb-4"
						>
							Show less
						</button>
					{:else}
						<p>{video.description.slice(0, 100)}...</p>
						<button
							on:click={() => (video.showFullDescription = true)}
							class="text-tertiary-500 hover:underline mb-4"
						>
							Read more
						</button>
					{/if}

					<div class="relative pt-[56.25%]">
						<iframe
							class="absolute top-0 left-0 w-full h-full"
							src={video.videoUrl}
							title={video.title}
							frameborder="0"
							allowfullscreen
							loading="lazy"
						></iframe>
					</div>
				</div>
			{/if}
		{/each}
	</article>
</div>
