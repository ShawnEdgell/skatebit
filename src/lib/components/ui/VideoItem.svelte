<script lang="ts">
	import type { YouTubeItem } from '$lib/types/youtube/YouTubeTypes';
	export let video: YouTubeItem;

	let showIframe = false;
	let showFullDescription = false;

	/**
	 * Toggles the visibility of the full video description.
	 */
	function toggleDescription() {
		showFullDescription = !showFullDescription;
	}

	/**
	 * Formats the published date to a readable string.
	 * @param dateString - The ISO date string.
	 * @returns A formatted date string.
	 */
	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	/**
	 * Loads the iframe to play the video.
	 */
	function loadIframe() {
		showIframe = true;
	}
</script>

<div class="mb-8">
	<h2 class="text-xl font-semibold">{video.title}</h2>
	<p>{formatDate(video.publishedAt)}</p>

	{#if video.description?.trim()}
		{#if video.description.length > 100}
			{#if showFullDescription}
				<p>{video.description}</p>
				<button on:click={toggleDescription} class="text-primary hover:underline mb-4">
					Show less
				</button>
			{:else}
				<p>{video.description.slice(0, 100)}...</p>
				<button on:click={toggleDescription} class="text-primary hover:underline mb-4">
					Read more
				</button>
			{/if}
		{:else}
			<p>{video.description}</p>
		{/if}
	{/if}

	<div class="video-container">
		{#if showIframe}
			<iframe
				src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
				title={video.title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		{:else}
			<div
				class="video-placeholder"
				on:click={loadIframe}
				role="button"
				tabindex="0"
				aria-label="Play video"
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						loadIframe();
					}
				}}
			>
				<img
					src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
					alt={video.title}
					loading="lazy"
				/>
				<svg class="play-button" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier"
						><path
							fill="red"
							d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"
						></path><path fill="#ffffff" d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"></path></g
					></svg
				>
			</div>
		{/if}
	</div>
</div>

<style>
	.video-container {
		position: relative;
		width: 100%;
		/* 16:9 Aspect Ratio */
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
	}

	.video-container iframe,
	.video-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.video-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.video-placeholder img {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.play-button {
		position: relative;
		width: 64px;
		height: 64px;
		color: white;
		z-index: 1;
		transition: transform 0.3s;
	}

	.video-placeholder:hover .play-button {
		transform: scale(1.1);
	}
</style>
