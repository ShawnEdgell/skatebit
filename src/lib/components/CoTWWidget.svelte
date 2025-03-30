<script lang="ts">
	import { onMount } from 'svelte';
	import { getClipPosts } from '$lib/firebase/clips';
	import type { ClipPost } from '$lib/types/clips';
	import VideoItem from '$lib/components/VideoItem.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import CountdownTimer from './CountdownTimer.svelte';

	let clips: ClipPost[] = [];
	let topClip: ClipPost | null = null;

	onMount(async () => {
		clips = await getClipPosts('popular');
		topClip = clips[0] ?? null;
	});
</script>

{#if topClip}
	<div class="card bg-base-200 p-4 shadow">
		<h3 class="mb-2 text-lg font-semibold">🎬 Clip of the Week</h3>
		<div class="mb-2">
			<CountdownTimer />
		</div>

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
					<p class="text-xs opacity-60">{formatDate(topClip.timestamp)}</p>
				</div>
			</a>
		</div>

		<a href="/cotw" class="btn btn-sm btn-outline btn-primary w-full text-center">
			View All Clips
		</a>
	</div>
{:else}
	<div class="card bg-base-200 p-4 shadow">
		<h3 class="mb-2 text-lg font-semibold">🎬 Clip of the Week</h3>
		<div class="mb-2">
			<CountdownTimer />
		</div>
		<p class="text-sm opacity-60">
			No clips submitted yet. Be the first to upload and claim the spotlight!
		</p>
		<a href="/cotw" class="btn btn-sm btn-outline btn-primary mt-4 w-full text-center">
			Submit a Clip
		</a>
	</div>
{/if}
