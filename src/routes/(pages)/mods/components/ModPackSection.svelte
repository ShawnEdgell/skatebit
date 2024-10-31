<script lang="ts">
	import { modPacks } from '../packsData';
	import ModCard from '../../../../components/ModCard.svelte';
</script>

<section>
	<h2>Mod Packs</h2>
	<p>
		"Mod Packs" allows users to download the complete set of mods for their chosen game version with
		a single click, making it easy to get all the necessary mods at once.
	</p>

	{#each modPacks as modPack}
		<div class="mt-4">
			<ModCard
				title={modPack.title}
				note={modPack.note}
				includes={modPack.includes}
				downloadLinks={modPack.downloadLinks}
			/>
		</div>
	{/each}
</section>
