<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import { sessionNewsItems } from '$lib/data/allNewsItems';
</script>

<svelte:head>
	<title>Skatebit | Session: Skate Sim News</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-error mb-2">Session</span>
			<h1>News</h1>
			<p>A short description.</p>
			<hr class="!border-t-2" />
		</div>
		{#each sessionNewsItems as { title, date, description, videoUrl, videoTitle }}
			<h2>{title}</h2>
			<p><small>{date}</small></p>
			<p>{description}</p>
			<iframe src={videoUrl} title={videoTitle} frameborder="0" allowfullscreen loading="lazy"
			></iframe>
		{/each}
	</article>
</div>
