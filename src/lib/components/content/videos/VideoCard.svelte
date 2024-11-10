<!-- src/lib/components/VideoCard.svelte -->
<script lang="ts">
	import type { Video } from '$lib/types/videos/Video';

	export let video: Video;

	let isIframeLoading = true;

	/**
	 * Extracts the YouTube video ID from a given URL.
	 * Supports both standard and short YouTube URLs.
	 * @param url - The YouTube URL.
	 * @returns The extracted video ID or an empty string if invalid.
	 */
	function extractYouTubeVideoID(url: string): string {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
		const match = url.match(regex);
		return match ? match[1] : '';
	}

	// Compute the embed URL based on the extracted video ID
	const videoID = extractYouTubeVideoID(video.youtubeURL);
	const embedURL = videoID ? `https://www.youtube.com/embed/${videoID}` : null;

	// Handle iframe load event to hide the loading spinner
	const handleIframeLoad = () => {
		isIframeLoading = false;
	};

	/**
	 * Formats the createdAt field to a readable string.
	 * Handles both Firestore Timestamp and JavaScript Date objects.
	 * @param createdAt - The createdAt field from the video object.
	 * @returns A formatted date string or a fallback message.
	 */
	function formatDate(createdAt: any): string {
		if (!createdAt) return 'Uploading...';

		// Handle Firestore Timestamp
		if (createdAt.seconds && typeof createdAt.seconds === 'number') {
			return new Date(createdAt.seconds * 1000).toLocaleString(undefined, {
				dateStyle: 'medium',
				timeStyle: 'short'
			});
		}

		// Handle JavaScript Date
		if (createdAt instanceof Date) {
			return createdAt.toLocaleString(undefined, {
				dateStyle: 'medium',
				timeStyle: 'short'
			});
		}

		// Fallback for unexpected formats
		return 'Unknown date';
	}
</script>

<!-- Card Container -->
<a
	href={`/videos/${video.id}`}
	class="p-4 block bg-base-200 hover:bg-base-300 transition-colors duration-300 not-prose card overflow-hidden shadow-md"
>
	<!-- YouTube Embed with Loading Spinner -->

	{#if embedURL}
		<div class="relative aspect-[16/9] w-full overflow-hidden">
			{#if isIframeLoading}
				<!-- Loading Spinner Overlay -->
				<div class="absolute inset-0 bg-base-200 flex items-center justify-center">
					<!-- Using DaisyUI Spinner Classes -->
					<span class="loading loading-spinner loading-lg"></span>
				</div>
			{/if}
			<!-- Embedded YouTube Iframe -->
			<iframe
				src={embedURL}
				title={`YouTube video: ${video.title}`}
				frameborder="0"
				loading="lazy"
				allow="autoplay; encrypted-media; picture-in-picture"
				sandbox="allow-scripts allow-same-origin allow-presentation"
				allowfullscreen
				class="w-full h-full card"
				on:load={handleIframeLoad}
			></iframe>
		</div>
	{:else}
		<!-- Fallback for Invalid YouTube URLs -->
		<div class="rounded bg-red-100 p-4 text-red-700">
			<p>Invalid YouTube URL provided.</p>
		</div>
	{/if}
	<div>
		<!-- Video Title -->
		<h2 class="text-xl sm:text-2xl my-6 font-bold break-words">{video.title}</h2>

		<!-- Uploader Information -->
		<div class="flex items-center gap-4 text-sm lg:text-base">
			{#if video.userPhotoURL}
				<img
					src={video.userPhotoURL}
					alt="{video.userName}'s profile picture"
					class="w-10 h-10 rounded-full object-cover"
				/>
			{/if}

			<div>
				<p class="font-semibold">{video.userName}</p>
				<p class="text-gray-500">
					{video.createdAt
						? new Date(video.createdAt.seconds * 1000).toLocaleString(undefined, {
								dateStyle: 'medium',
								timeStyle: 'short'
							})
						: 'Unknown date'}
				</p>
			</div>
		</div>
	</div>
</a>

<style>
	/* Optional: Add additional styling as needed */
</style>
