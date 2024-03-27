<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';

	type VideoData = {
		title: string;
		description: string;
		src: string;
		videoTitle: string;
		date: string;
	};

	let videos: VideoData[] = [
		{
			title: 'Official Replay Editor Tutorial - Pt 1: Basics',
			description: 'This tutorial goes over the basic functions of the in game Replay Editor.',
			src: 'https://www.youtube.com/embed/nAEXllb3e-c?si=HYn9kzP4wPjDhzhQ',
			videoTitle: 'Session: Skate Sim | Official Replay Editor Tutorial - Pt 1: Basics',
			date: 'January 12, 2024'
		},
		{
			title: 'Official Replay Editor Tutorial - Pt 2: POV',
			description:
				'This breakdown will show you how to turn your skate clips into first-person POV.',
			src: 'https://www.youtube.com/embed/nAEXllb3e-c?si=T_cooFn1OHzj9PkI',
			videoTitle: 'XXL 3 Mod - Getting Started',
			date: 'January 26, 2024' // Example date
		}
		// Add other videos with their dates
	];

	// Sorting the videos array by date in descending order (newest first)
	videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
</script>

<svelte:head>
	<title>Skatebit | Session: Skate Sim</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-error mb-2">Session</span>
			<h1>Guides</h1>
			<p>General guides and tutorials for Session.</p>
			<hr class="!border-t-2" />
		</div>

		{#each videos as video}
			<div>
				<h2>{video.title}</h2>
				<p><small>{video.date}</small></p>
				<p>{video.description}</p>
				<iframe
					src={video.src}
					title={video.videoTitle}
					frameborder="0"
					allowfullscreen
					loading="lazy"
				></iframe>
			</div>
		{/each}
	</article>
</div>
