<script lang="ts">
	import VideoItem from '$lib/components/VideoItem.svelte';
	import type { YouTubeItem } from '$lib/types/YoutubeTypes';
	export let videos: YouTubeItem[] = [];
</script>

{#each videos as video}
	<section>
		<VideoItem {video} />
	</section>
{/each}
