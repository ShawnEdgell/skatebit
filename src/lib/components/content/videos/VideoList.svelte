<!-- src/lib/components/VideoList.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs, orderBy, query } from 'firebase/firestore';
	import VideoCard from './VideoCard.svelte';
	import type { Video } from '$lib/types/videos/Video';

	export let videos: Video[] = [];
	let isLoadingVideos = true;
	let videosErrorMessage = '';

	/**
	 * Fetches videos from Firestore ordered by creation date descending.
	 */
	export async function fetchVideos() {
		isLoadingVideos = true;
		videosErrorMessage = '';
		try {
			const videosCollection = collection(db, 'videos');
			const videosQuery = query(videosCollection, orderBy('createdAt', 'desc'));
			const querySnapshot = await getDocs(videosQuery);
			videos = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})) as Video[];
		} catch (error) {
			console.error('Error fetching videos:', error);
			if (error instanceof Error) {
				videosErrorMessage = `Failed to load videos: ${error.message}`;
			} else {
				videosErrorMessage = 'Failed to load videos due to an unknown error.';
			}
		} finally {
			isLoadingVideos = false;
		}
	}

	// Initially load videos when the component mounts
	onMount(async () => {
		await fetchVideos();
	});
</script>

<div class="flex flex-col w-full">
	<h2>Latest Videos</h2>
	{#if isLoadingVideos}
		<p>Loading videos...</p>
	{:else if videosErrorMessage}
		<p class="text-red-500">{videosErrorMessage}</p>
	{:else if videos.length === 0}
		<p>No videos available.</p>
	{:else}
		<div class="w-full flex flex-col space-y-4">
			{#each videos as video (video.id)}
				<VideoCard {video} />
			{/each}
		</div>
	{/if}
</div>
