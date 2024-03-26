<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';

	// Skater XL News data
	const newsItems = [
		{
			title: 'Schoolyard DLC Trailer',
			date: 'February 22, 2024',
			description:
				'Get ready to vibe in the ultimate skate playground, where every rail, ledge, and gap is primed for epic tricks and sick lines on the Schoolyard!',
			videoUrl: 'https://www.youtube.com/embed/91yw2ohAciQ?si=xlc2D6bE26hd4Wnn',
			videoTitle: 'Schoolyard DLC Trailer'
		},
		{
			title: 'Abandoned Mall DLC Trailer',
			date: 'October 26, 2023',
			description:
				'The skatepark skateboarders have been dreaming of. Check out the Abandoned Mall and find all the new spots where you can perform your best tricks.',
			videoUrl: 'https://www.youtube.com/embed/g2dp7yRc5xc?si=JXTYMwWaVQ96OTrR',
			videoTitle: 'Abandoned Mall DLC Trailer'
		},
		{
			title: 'Waterpark & Chris Cole DLC Trailer',
			date: 'May 17, 2023',
			description:
				'Explore a brand-new map with the latest spots and missions. Your new playground is an old abandoned water park.',
			videoUrl: 'https://www.youtube.com/embed/f-_E8myW-C4?si=g8ykgWVu56JPsbBD',
			videoTitle: 'Waterpark & Chris Cole DLC Trailer'
		},
		{
			title: 'Session: Skate Sim | Launch Trailer',
			date: 'September 22, 2022',
			description:
				'Explore a brand-new map with the latest spots and missions. Your new playground is an old abandoned water park.',
			videoUrl: 'https://www.youtube.com/embed/GPamFRBnykA?si=E6yok8rQGmim5ylq',
			videoTitle: 'Waterpark & Chris Cole DLC Trailer'
		},
		{
			title: 'New Skater Reveal',
			date: 'September 19, 2022',
			description:
				'Torey Pudwill, Nora Vasconsellos, Samarria Brevard, and Ryan Thompson will join the fray, bringing the roster up to 16 big names. ',
			videoUrl: 'https://www.youtube.com/embed/_FCXzT5_sAA?si=eyDZmHRnKBky7TW9',
			videoTitle: 'New Skater Reveal'
		}
		// Add more news items as needed
	];
</script>

<svelte:head>
	<title>Skatebit | Session: Skate Sim News</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }} class="max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold mb-8">Session News</h1>

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
