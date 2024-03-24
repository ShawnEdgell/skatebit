<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';

	// Skate. News data
	const newsItems = [
		{
			title: 'We Read Your Comments',
			date: 'Dec 21, 2023',
			description:
				'Cuz and Deran from Full Circle took some time ahead of the holidays to answer some of your burning questions about skate. They cover topics like flick-it controls, updated trick mechanics, console playtesting, and more.',
			videoUrl: 'https://www.youtube.com/embed/iXdQp0fmhCE?si=IC0HIfSPieLxaC97',
			videoTitle: 'We Read Your Comments | skate.'
		},
		{
			title: 'The Board Room: Episode 4',
			date: 'August 17, 2023',
			description:
				'In this episode, the developers are pulling back the curtains and letting you in on the process of capturing new tricks, how we’re integrating tricks into our playtesting, as well as sharing our excitement about all the new features, animations and tricks we’re working on for skate.',
			videoUrl: 'https://www.youtube.com/embed/uZTUXMAPmxw?si=rZEaRf7wlH3z-cJU',
			videoTitle: 'The Board Room: Episode 4 | skate.'
		},
		{
			title: 'The Board Room: Episode 3',
			date: 'April 20, 2023',
			description: "This episode covers activities and how we'll spend time in San Vansterdam.",
			videoUrl: 'https://www.youtube.com/embed/ItE4vo3fXcQ?si=Plt4TyGPzUEUJu5p',
			videoTitle: 'The Board Room: Episode 3 | skate.'
		}
		// Add more news items as needed
	];
</script>

<svelte:head>
	<title>Skatebit | Skate. News</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }} class="max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold mb-8">Skate. News</h1>

	<!-- Container for articles to control spacing -->
	<div class="space-y-12">
		{#each newsItems as { title, date, description, videoUrl, videoTitle }}
			<article>
				<h2 class="text-xl font-semibold mb-2">{title}</h2>
				<p class="text-gray-500 mb-4">{date}</p>
				<p class="mb-4">{description}</p>
				<div class="aspect-video w-full">
					<iframe src={videoUrl} title={videoTitle} frameborder="0" allowfullscreen loading="lazy"
					></iframe>
				</div>
			</article>
		{/each}
	</div>
</div>
