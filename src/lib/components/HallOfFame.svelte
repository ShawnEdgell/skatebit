<script lang="ts">
	import { onMount } from 'svelte';
	import { getHallOfFameEntries } from '$lib/firebase/hallOfFame';
	import type { ClipPost } from '$lib/types/clips';
	import VideoItem from '$lib/components/VideoItem.svelte';
	import { formatDate } from '$lib/utils/formatDate';

	let hallOfFame: ClipPost[] = [];
	let loading = true;

	onMount(async () => {
		hallOfFame = await getHallOfFameEntries();
		loading = false;
	});
</script>

<div class="card bg-base-200 p-4 shadow">
	<h3 class="mb-2 text-lg font-semibold">🏆 Hall of Fame</h3>

	{#if loading}
		<p class="text-sm opacity-60">Loading legendary clips...</p>
	{:else if hallOfFame.length > 0}
		<ul class="space-y-6">
			{#each hallOfFame as clip}
				<li>
					<VideoItem video={clip} />

					<a href={`/cotw/${clip.id}`} class="mt-2 flex items-center gap-3 hover:opacity-90">
						<img
							src={clip.userPhotoURL || 'https://via.placeholder.com/40'}
							alt={clip.userDisplayName}
							class="h-8 w-8 rounded-full"
						/>
						<div class="text-sm">
							<p class="font-semibold">{clip.userDisplayName}</p>
							<p class="text-xs opacity-60">Week of {clip.weekId} — {formatDate(clip.timestamp)}</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-sm opacity-60">No champions yet! Stay tuned for the top clips each week.</p>
	{/if}
</div>
