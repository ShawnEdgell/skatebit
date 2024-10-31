<script lang="ts">
	export let video: {
		title: string;
		publishedAt?: string;
		description?: string;
		videoId: string;
	};

	export let showDate: boolean = true;

	let showIframe = false;
	let showFullDescription = false;

	function toggleDescription() {
		showFullDescription = !showFullDescription;
	}

	function loadIframe() {
		showIframe = true;
	}

	function formatDate(dateString: string | undefined) {
		if (!dateString) return 'N/A'; // Default string if the date is missing
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			loadIframe();
		}
	}
</script>

<section class="mb-8 card shadow-xl">
	<div class="rounded-t-3xl relative w-full pb-[56.25%] h-0 overflow-hidden">
		{#if showIframe}
			<iframe
				class="absolute top-0 left-0 w-full h-full"
				src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
				title={video.title}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		{:else}
			<div
				class="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer group"
				on:click={loadIframe}
				role="button"
				tabindex="0"
				aria-label="Play video"
				on:keydown={handleKeydown}
			>
				<img
					class="absolute w-full h-full object-cover"
					src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
					alt={video.title}
					loading="lazy"
				/>
				<svg
					class="relative w-16 h-16 text-white z-5 transform transition-transform duration-300 group-hover:scale-110"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
				>
					<path
						fill="red"
						d="M14.712 4.633a1.754 1.754 0 00-1.234-1.234C12.382 3.11 8 3.11 8 3.11s-4.382 0-5.478.289c-.6.161-1.072.634-1.234 1.234C1 5.728 1 8 1 8s0 2.283.288 3.367c.162.6.635 1.073 1.234 1.234C3.618 12.89 8 12.89 8 12.89s4.382 0 5.478-.289a1.754 1.754 0 001.234-1.234C15 10.272 15 8 15 8s0-2.272-.288-3.367z"
					></path>
					<path fill="#ffffff" d="M6.593 10.11l3.644-2.098-3.644-2.11v4.208z"></path>
				</svg>
			</div>
		{/if}
	</div>

	<header class="not-prose text-sm card-header">
		{#if showDate}
			<p class:mb-1={video.description?.trim()} class:mb-2={!video.description?.trim()}>
				{formatDate(video.publishedAt)}
			</p>
		{/if}
	</header>
	<section class="px-4">
		<h2 class="not-prose mt-4 text-xl md:text-2xl lg:text-3xl font-bold mb-4">
			{video.title}
		</h2>
	</section>
	<footer class="card-footer">
		{#if video.description?.trim()}
			<p class="break-words mb-2">
				{#if showFullDescription || video.description.length <= 100}
					{video.description}
				{:else}
					{video.description.slice(0, 100)}...
				{/if}
			</p>
			{#if video.description.length > 100}
				<button on:click={toggleDescription} class="underline hover:no-underline mb-4">
					{showFullDescription ? 'Show less' : 'Read more'}
				</button>
			{/if}
		{/if}
	</footer>
</section>
