<!-- VideoPlayerCard.svelte -->
<script lang="ts">
	import type { YouTubeItem } from '$lib/types/youtube';

	export let video: YouTubeItem;
	export let showMeta: boolean = false;
	export let showDescription: boolean = false;
	export let cardStyle: boolean = false;

	let showIframe = false;
	let showFullDescription = false;

	function loadIframe() {
		showIframe = true;
	}

	function toggleDescription() {
		showFullDescription = !showFullDescription;
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class={`w-full ${cardStyle ? 'not-prose card bg-base-300 mt-6' : ''}`}>
	<!-- Video -->
	<div class="bg-base-300 relative aspect-[16/9] w-full rounded-md">
		{#if showIframe}
			<iframe
				src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
				title={video.title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
				class="absolute top-0 left-0 h-full w-full"
			></iframe>
		{:else}
			<div
				class="group absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center"
				on:click={loadIframe}
				role="button"
				tabindex="0"
				aria-label="Play video"
				on:keydown={(e: KeyboardEvent) => {
					if (e.key === 'Enter' || e.key === ' ') loadIframe();
				}}
			>
				<img
					src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
					alt={video.title}
					class="absolute h-full w-full object-cover"
				/>
				<svg
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					class="relative z-10 h-16 w-16 text-white transition-transform duration-300 group-hover:scale-110"
				>
					<path
						fill="red"
						d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"
					/>
					<path fill="#ffffff" d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z" />
				</svg>
			</div>
		{/if}
	</div>

	{#if cardStyle}
		<div class="card-body space-y-4">
			<h2 class="text-xl font-bold">{video.title}</h2>

			{#if showMeta}
				<div class="flex items-center gap-2 text-sm opacity-80">
					{#if video.channelAvatar}
						<img
							src={video.channelAvatar}
							alt={video.channelTitle}
							class="h-6 w-6 rounded-full"
							loading="lazy"
						/>
					{/if}
					<span class="font-medium">{video.channelTitle}</span>
					<span class="mx-1">•</span>
					<span>{video.publishedAt ? formatDate(video.publishedAt) : 'Unknown date'}</span>
				</div>
			{/if}

			{#if showDescription && video.description?.trim()}
				<div class="prose">
					{#if video.description.length > 100}
						{#if showFullDescription}
							<p class="mb-2">{video.description}</p>
							<button
								on:click={toggleDescription}
								class="text-accent mt-2 cursor-pointer border-none bg-transparent p-0 underline hover:no-underline"
							>
								Show less
							</button>
						{:else}
							<p class="mb-2">{video.description.slice(0, 100)}...</p>
							<button
								on:click={toggleDescription}
								class="text-accent mt-2 cursor-pointer border-none bg-transparent p-0 underline hover:no-underline"
							>
								Read more
							</button>
						{/if}
					{:else}
						<p>{video.description}</p>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
