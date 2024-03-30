<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { tocCrawler } from '@skeletonlabs/skeleton';

	const channels = [
		{ name: 'Skater XL', playlistId: 'UUpBQRZl7apZt_LQXKgqKQiQ' },
		{ name: 'Session', playlistId: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm' },
		{ name: 'Skate.', playlistId: 'UUSBQJEWTWOUCO65xvoDfljw' }
	];

	const videos = writable<
		{
			id: number;
			title: string;
			date: string;
			description: string;
			videoUrl: string;
			videoTitle: string;
		}[]
	>([]);

	const apiKey = import.meta.env.VITE_YT_API_KEY as string;

	interface YouTubeVideoItem {
		snippet: {
			title: string;
			publishedAt: string;
			description: string;
			resourceId: { videoId: string };
		};
	}

	function truncateText(text: string, length: number): string {
		return text.length > length ? `${text.substring(0, length)}...` : text;
	}

	const expandedItems = writable(new Set<number>());

	function toggleExpanded(id: number): void {
		expandedItems.update((current) => {
			const newExpandedItems = new Set(current);
			newExpandedItems.has(id) ? newExpandedItems.delete(id) : newExpandedItems.add(id);
			return newExpandedItems;
		});
	}

	async function fetchVideos(playlistId: string) {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=20&key=${apiKey}`
		);
		const data = await response.json();
		return data.items
			.filter((item: YouTubeVideoItem) => item.snippet.description.trim().length > 0)
			.map((item: YouTubeVideoItem) => ({
				title: item.snippet.title,
				date: new Date(item.snippet.publishedAt).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				}),
				description: item.snippet.description,
				videoUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
				videoTitle: item.snippet.title
			}));
	}

	onMount(async () => {
		const videoFetchPromises = channels.map((channel) => fetchVideos(channel.playlistId));
		const allVideos = await Promise.all(videoFetchPromises);
		const combinedVideos = allVideos.flat();
		combinedVideos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		videos.set(combinedVideos.map((item, index) => ({ ...item, id: index })));
	});
</script>

<svelte:head>
	<title>Skatebit | News</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div>
			{#each channels as { name }}
				<span
					class="badge mr-1 {name === 'Skater XL'
						? 'variant-filled-tertiary'
						: name === 'Skate.'
							? 'variant-filled-warning'
							: 'variant-filled-error'} mb-2">{name}</span
				>
			{/each}

			<h1>News</h1>
			<p>All the latest updates, breaking news, and insider insights.</p>
			<hr class="border-t-2 my-2" />
		</div>
		{#each $videos as { title, date, description, videoUrl, videoTitle }, index}
			<div>
				<h2 class="h2">{title}</h2>
				<p class="text-sm">{date}</p>
				<p>
					{#if $expandedItems.has(index)}
						{description}
						<button
							class="cursor-pointer text-blue-500 underline"
							on:click={() => toggleExpanded(index)}>Show less</button
						>
					{:else}
						{truncateText(description, 100)}
						<button
							class="cursor-pointer text-blue-500 underline"
							on:click={() => toggleExpanded(index)}>Read more</button
						>
					{/if}
				</p>
				<div class="relative pt-[56.25%]">
					<iframe
						class="absolute top-0 left-0 w-full h-full"
						src={videoUrl}
						title={videoTitle}
						frameborder="0"
						allowfullscreen
						loading="lazy"
					></iframe>
				</div>
			</div>
		{/each}
	</article>
</div>
