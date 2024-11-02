<script lang="ts">
	import { pageHeader, VideoItem } from '$lib';

	const { title, description, heading } = pageHeader.news;

	export let data;
	let { videos } = data;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<section>
	<h1>{heading}</h1>
	<p>{description}</p>
	<hr />
</section>

<article>
	{#each videos as video (video.videoId)}
		<VideoItem {video} />
	{/each}
</article>
