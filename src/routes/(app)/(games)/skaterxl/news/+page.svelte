<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import { skaterxlNewsItems } from '$lib/data/allNewsItems';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
			<h1 class="h1">News</h1>
			<p>All the latest news for Skater XL.</p>
			<hr class="!border-t-2" />
		</div>
		{#each skaterxlNewsItems as { title, date, description, videoUrl, videoTitle }}
			<h2>{title}</h2>
			<p><small>{date}</small></p>
			<p>{description}</p>
			<iframe src={videoUrl} title={videoTitle} frameborder="0" allowfullscreen loading="lazy"
			></iframe>
		{/each}
	</article>
</div>
