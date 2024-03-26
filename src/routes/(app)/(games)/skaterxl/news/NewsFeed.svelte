<script lang="ts">
	// Skater XL News data
	const newsItems = [
		{
			title: 'Now Available On Nintendo Switch',
			date: 'December 5, 2023',
			description:
				'Skater XL has just dropped into the Nintendo Switch eShop, bringing all its skateboarding glory to your on-the-go gaming sessions...',
			videoUrl: 'https://www.youtube.com/embed/r6_wjWiXpx8',
			videoTitle: 'Skater XL Nintendo Switch Launch Trailer'
		},
		{
			title: 'Grabs Update On All Platforms',
			date: 'August 30, 2023',
			description:
				'More freedom with grabs is now available on PlayStation, Xbox, and in the public branch on Steam...',
			videoUrl: 'https://www.youtube.com/embed/tRuprTKtJOo',
			videoTitle: 'Skater XL Grabs Update On All Platforms'
		},
		{
			title: 'Fire Station Park now available in the Mod Browser',
			date: 'April 28, 2023',
			description:
				'Fire Station Park is now available in the Skater XL Mod Browser on PlayStation, Xbox, and PC coinciding with the grand opening of the brand new park in Fort Worth, Texas. The park was made possible by a generous donation from Dickies Skateboarding, and the construction is now complete, making it available in both physical and digital formats.',
			videoUrl: 'https://www.youtube.com/embed/2HO3nwkdslQ?si=OnP3oP7gAVQEL9oJ',
			videoTitle: 'Fire Station Park now available in the Mod Browser'
		},
		{
			title: 'Some new things brewing for 2023...',
			date: 'December 22, 2022',
			description:
				"Take a look at Skater XL's announcement trailer for some exciting features that were promised for 2023. As of 2024, they haven't been released yet...",
			videoUrl: 'https://www.youtube.com/embed/zIUTsIKBa_o',
			videoTitle: 'Skater XL - Some new things brewing for 2023...'
		}
		// Add more news items as needed
	];
</script>

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
