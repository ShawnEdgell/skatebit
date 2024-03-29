<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	let tabIndex = 0; // This will be used as a key to force updates

	const activeGames = writable(['Skater XL', 'Session', 'Skate.']);

	function toggleGame(game: string) {
		activeGames.update((current) => {
			const isActive = current.includes(game);
			const updated = isActive ? current.filter((g) => g !== game) : [...current, game];

			// Trigger reactivity by incrementing tabIndex
			tabIndex += 1;
			return updated;
		});
	}

	import { allNewsItems } from '$lib/data/allNewsItems';
</script>

<svelte:head>
	<title>Skatebit | All News</title>
</svelte:head>

<!-- Updated use of tabIndex as a reactive key -->
<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page', key: tabIndex }}>
	<article>
		<div class="header">
			<!-- Toggle buttons with dynamic classes for active/inactive states -->
			<button
				class="badge variant-filled-tertiary mb-2 cursor-pointer {$activeGames.includes('Skater XL')
					? 'active bg-blue-500'
					: 'inactive bg-gray-500'}"
				on:click={() => toggleGame('Skater XL')}>Skater XL</button
			>
			<button
				class="badge variant-filled-error mb-2 cursor-pointer {$activeGames.includes('Session')
					? 'active bg-blue-500'
					: 'inactive bg-gray-500'}"
				on:click={() => toggleGame('Session')}>Session</button
			>
			<button
				class="badge variant-filled-warning mb-2 cursor-pointer {$activeGames.includes('Skate.')
					? 'active bg-blue-500'
					: 'inactive bg-gray-500'}"
				on:click={() => toggleGame('Skate.')}>Skate.</button
			>
			<h1>News</h1>
			<p>A source for the latest game updates, breaking news, and insider insights.</p>
			<hr class="!border-t-2" />
		</div>
		<!-- News items -->
		{#each allNewsItems as item}
			{#if $activeGames.includes(item.game)}
				<div>
					<h2>{item.title}</h2>
					<p><small>{item.date}</small></p>
					<p>{item.description}</p>
					<iframe src={item.videoUrl} title={item.videoTitle} allow="fullscreen" loading="lazy">
					</iframe>
				</div>
			{/if}
		{/each}
	</article>
</div>

<style>
	.active {
		opacity: 1; /* Fully opaque */
	}
	.inactive {
		opacity: 0.5; /* Faded appearance */
	}
</style>
