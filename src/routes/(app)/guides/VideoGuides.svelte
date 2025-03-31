<script lang="ts">
	import { VideoItem } from '$lib/components';
	import type { YouTubeItem } from '$lib/types/youtube';
	export let videos: YouTubeItem[] = [];
</script>

<div class="mt-16">
	{#each videos as video}
		<div class="card bg-base-300 mt-8">
			<VideoItem {video} />
			<div class="card-body">
				<div class="card-title font-bold">{video.title}</div>
			</div>
		</div>
	{/each}
</div>
