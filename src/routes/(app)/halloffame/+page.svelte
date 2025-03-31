<script lang="ts">
	import { onMount } from 'svelte';
	import { getHallOfFameEntries } from '$lib/firebase/hallOfFame';
	import type { ClipPost } from '$lib/types/clips';
	import type { Timestamp } from 'firebase/firestore';

	const pageTitle = 'Hall of Fame';
	const pageDescription = 'Celebrate the winners from each week!';

	let entries: ClipPost[] = [];
	let loading = true;

	onMount(async () => {
		entries = await getHallOfFameEntries();

		entries.sort((a, b) => {
			const aMillis = (a.timestamp as Timestamp)?.toMillis?.() ?? 0;
			const bMillis = (b.timestamp as Timestamp)?.toMillis?.() ?? 0;
			return bMillis - aMillis;
		});

		loading = false;
	});
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<section>
	<h1>{pageTitle} <span class="badge badge-sm lg:badge-md badge-info">Beta</span></h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

<h2>Winners</h2>

{#if loading}
	<p>Loading winners...</p>
{:else if entries.length === 0}
	<p class="text-sm opacity-50">No winners yet. Be the first to make history!</p>
{:else}
	<ul class="space-y-3">
		{#each entries as entry, index}
			<li>
				<a href={`/cotw/${entry.id}`} class="hover:text-primary no-underline">
					Week {index + 1} - {entry.userDisplayName}
				</a>
			</li>
		{/each}
	</ul>
{/if}
