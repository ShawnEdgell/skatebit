<script lang="ts">
	import VideoItem from '$lib/components/VideoItem.svelte';
	import type { YouTubeItem } from '$lib/types/YoutubeTypes';
	export let videos: YouTubeItem[] = [];
</script>

{#each videos as video}
	<section class="mb-8">
		<VideoItem {video} />
	</section>
{/each}
