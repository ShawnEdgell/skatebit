<!-- VideoSection.svelte -->
<script lang="ts">
	export let title: string;
	export let description: string;
	export let src: string;
	export let videoTitle: string;
</script>

<div>
	<h2>{title}</h2>
	<p>{description}</p>
	<iframe {src} title={videoTitle} frameborder="0" allowfullscreen loading="lazy"></iframe>
</div>
