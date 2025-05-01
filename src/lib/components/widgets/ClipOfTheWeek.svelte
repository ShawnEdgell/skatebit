<script lang="ts">
	import { onMount } from 'svelte';
	import { clipUpdated } from '$lib/stores/clipUpdated';
	import { getCurrentWeekId } from '$lib/utils/week';
	import type { ClipPost } from '$lib/types/clips';
	import VideoCard from '../video/VideoCard.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import { getClipPosts } from '$lib/firebase/clips';
	import FollowEyes from '../ui/FollowEyes.svelte';

	let clips: ClipPost[] = [];
	let featuredClip: ClipPost | null = null;
	let loading = true;

	const weekId = getCurrentWeekId();

	async function loadClips() {
		loading = true;
		clips = await getClipPosts('popular', weekId);

		if (clips.length > 0) {
			const randomIndex = Math.floor(Math.random() * clips.length);
			featuredClip = clips[randomIndex];
		} else {
			featuredClip = null;
		}
		loading = false;
	}

	onMount(() => {
		loadClips();

		const unsubscribe = clipUpdated.subscribe((updated) => {
			if (updated) {
				loadClips();
				clipUpdated.set(false);
			}
		});

		return unsubscribe;
	});
</script>

<div class="card bg-base-200 p-4">
	<h3 class="mb-2 text-lg font-semibold">🎬 Clip of the Week</h3>

	{#if loading}
		<!-- Spinner in aspect-ratio box -->
		<div class="bg-base-300 rounded-box flex aspect-[16/9] w-full items-center justify-center">
			<span class="loading loading-spinner loading-lg text-primary"></span>
		</div>

		<!-- Placeholder user info -->
		<div class="my-3">
			<div class="flex items-center gap-3 opacity-60">
				<!-- SVG Avatar -->
				<svg
					class="text-base-content/40 h-8 w-8"
					fill="currentColor"
					viewBox="-8 0 512 512"
					xmlns="http://www.w3.org/2000/svg"
					stroke="none"
				>
					<path
						d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
					/>
				</svg>

				<div class="text-sm">
					<p class="font-semibold">Loading user...</p>
					<p class="text-xs opacity-60">Loading date...</p>
				</div>
			</div>
		</div>

		<a href="/cotw" class="btn btn-sm btn-soft text-center">View All Clips</a>
	{:else if featuredClip}
		<VideoCard video={featuredClip} />

		<div class="my-3">
			<a
				href={`/cotw/${featuredClip.id}`}
				class="flex items-center gap-3 transition hover:opacity-90"
			>
				<img
					src={featuredClip.userPhotoURL || 'https://via.placeholder.com/40'}
					alt={featuredClip.userDisplayName}
					class="rounded-box h-8 w-8"
				/>
				<div class="text-sm">
					<p class="font-semibold">{featuredClip.userDisplayName}</p>
					{#if featuredClip.timestamp}
						<p class="text-xs opacity-60">{formatDate(featuredClip.timestamp)}</p>
					{/if}
				</div>
			</a>
		</div>

		<a href="/cotw" class="btn btn-sm btn-soft text-center">View All Clips</a>
	{:else}
		<!-- No clips fallback -->
		<div class="bg-base-300 rounded-box flex aspect-[16/9] w-full items-center justify-center">
			<span class="text-base-content/60 text-sm">No clips submitted yet.</span>
		</div>

		<div class="my-3">
			<div class="flex items-center gap-3 opacity-50">
				<svg
					class="text-base-content/40 h-8 w-8"
					fill="currentColor"
					viewBox="-8 0 512 512"
					xmlns="http://www.w3.org/2000/svg"
					stroke="none"
				>
					<path
						d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
					/>
				</svg>

				<div class="text-sm">
					<p class="font-semibold">Your name here</p>
					<p class="text-xs opacity-60">Date TBD</p>
				</div>
			</div>
		</div>

		<a href="/cotw" class="btn btn-sm btn-soft text-center">Submit a Clip</a>
	{/if}
</div>
