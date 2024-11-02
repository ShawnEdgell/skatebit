<script lang="ts">
	import { modPacks } from '$lib';

	type DownloadLink = { url: string; label: string };

	interface ModPack {
		title: string;
		note?: string;
		includes: string[];
		downloadLinks: DownloadLink[];
	}

	// Ensure modPacks is correctly typed
	const typedModPacks: ModPack[] = modPacks;
</script>

<section>
	<h2>Mod Packs</h2>
	<p>
		"Mod Packs" allows users to download the complete set of mods for their chosen game version with
		a single click, making it easy to get all the necessary mods at once.
	</p>

	{#each typedModPacks as modPack (modPack.title)}
		<h3>{modPack.title}</h3>

		{#if modPack.note}
			<strong>Note:</strong> <span>{modPack.note}</span>
		{/if}

		{#if modPack.includes.length > 0}
			<strong>Includes:</strong> <span>{modPack.includes.join(', ')}</span>
		{/if}

		<div class="flex flex-wrap items-start">
			{#each modPack.downloadLinks as { url, label }}
				<a href={url} class="btn no-underline" target="_blank" rel="noopener noreferrer">
					{label}
				</a>
			{/each}
		</div>
	{/each}
</section>
