<script lang="ts">
	import { onMount } from 'svelte';
	import { getHallOfFameEntries } from '$lib/firebase/hallOfFame';
	import type { ClipPost } from '$lib/types/clips';

	let entries: ClipPost[] = [];

	onMount(async () => {
		entries = await getHallOfFameEntries();

		// Sort by weekId ascending (optional)
		entries.sort((a, b) => a.weekId.localeCompare(b.weekId));
	});
</script>

<div class="card bg-base-300 p-4">
	<h3 class="mb-3 text-lg font-semibold">🏆 Hall of Fame</h3>

	{#if entries.length > 0}
		<ul class="space-y-1 text-sm">
			{#each entries as entry, i}
				<li>
					<a href={`/cotw/${entry.id}`} class="hover:text-primary no-underline">
						Week {i + 1} - {entry.userDisplayName}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-sm opacity-60">No winners yet. Check back after the first week ends!</p>
	{/if}
</div>
