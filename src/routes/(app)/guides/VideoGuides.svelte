<script lang="ts">
	import { VideoCard } from '$lib/components';
	import type { YouTubeItem } from '$lib/types/youtube';
	export let videos: YouTubeItem[] = [];
</script>

<div class="mt-16">
	{#each videos as video}
		<div class="card bg-base-300 mt-8">
			<VideoCard {video} />
			<div class="card-body">
				<h2 class="card-title not-prose font-bold">{video.title}</h2>
			</div>
		</div>
	{/each}
</div>
