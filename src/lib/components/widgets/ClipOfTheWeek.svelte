<script lang="ts">
	import { onMount } from 'svelte';
	import { clipUpdated } from '$lib/stores/clipUpdated';
	import { getCurrentWeekId } from '$lib/utils/week';
	import type { ClipPost } from '$lib/types/clips';
	import VideoItem from '../video/VideoItem.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { getClipPosts } from '$lib/firebase/clips';

	let clips: ClipPost[] = [];
	let topClip: ClipPost | null = null;
	const weekId = getCurrentWeekId(); // ✅ current week

	// Subscribe to clipUpdated store
	let widgetUpdated = false;

	// Subscribe to the store to trigger updates
	clipUpdated.subscribe((value) => {
		widgetUpdated = value;
		if (widgetUpdated) {
			loadClips(); // Re-fetch clips after the update
			clipUpdated.set(false); // Reset the flag after the widget is updated
		}
	});

	// Initial load of clips
	onMount(async () => {
		await loadClips();
	});

	async function loadClips() {
		clips = await getClipPosts('popular', weekId);
		topClip = clips[0] ?? null;
	}
</script>

{#if topClip}
	<div class="card bg-base-300 p-4">
		<h3 class="mb-2 text-lg font-semibold">🎬 Clip of the Week</h3>
		<VideoItem video={topClip} />
		<div class="my-3">
			<a href={`/cotw/${topClip.id}`} class="flex items-center gap-3 transition hover:opacity-90">
				<img
					src={topClip.userPhotoURL || 'https://via.placeholder.com/40'}
					alt={topClip.userDisplayName}
					class="h-8 w-8 rounded-full"
				/>
				<div class="text-sm">
					<p class="font-semibold">{topClip.userDisplayName}</p>
					{#if topClip.timestamp}
						<p class="text-xs opacity-60">
							{formatDate(topClip.timestamp)}
						</p>
					{/if}
				</div>
			</a>
		</div>

		<a href="/cotw" class="btn btn-sm btn-outline btn-primary text-center"> View All Clips </a>
	</div>
{:else}
	<div class="card bg-base-200 p-4">
		<h3 class="mb-2 text-lg font-semibold">🎬 Clip of the Week</h3>
		<p class="text-sm opacity-60">
			No clips submitted yet. Be the first to upload and claim the spotlight!
		</p>
		<a href="/cotw" class="btn btn-sm btn-outline btn-primary mt-4 text-center"> Submit a Clip </a>
	</div>
{/if}
