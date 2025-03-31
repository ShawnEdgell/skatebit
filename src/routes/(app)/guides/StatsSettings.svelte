<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	const statsData = [
		{ title: 'XXL 3 Mod Stats', content: 'Documents / SkaterXL / XXLMod3 / StatsCollections' },
		{ title: 'XXL 3 Mod Stance', content: 'Documents / SkaterXL / XXLMod3 / StanceCollections' },
		{ title: 'XXL 3 Mod Steeze', content: 'Documents / SkaterXL / XXLMod3 / SteezeCollections' },
		{ title: 'BonedOllieMod Settings', content: 'Documents / SkaterXL / BonedOllieMod' },
		{ title: "Fro's Mod Settings", content: 'Steam/ steamapps / common / SkaterXL / fro-mod' }
	];
</script>

<section>
	<h2>Stats & Settings</h2>
	<p>To install stats and settings, place the preset files in the following directories.</p>
	<blockquote>
		Note: For BonedOllieMod and Fro's Mod settings, you will need to replace the existing settings
		files with the new ones you want to install. These settings will be automatically applied when
		you launch the game.
	</blockquote>
</section>

<section>
	<div class="flex flex-col gap-4">
		{#each statsData as { title, content }}
			<Card {title} {content} />
		{/each}
	</div>
</section>
