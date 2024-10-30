<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { modPacks } from '../packsData';
	import ModCard from '../../../../components/ModCard.svelte';
</script>

<section>
	<h2>Mod Packs</h2>
	<p>
		"Mod Packs" allows users to download the complete set of mods for their chosen game version with
		a single click, making it easy to get all the necessary mods at once.
	</p>
	<p>Select your game version below to download a compatible mod pack:</p>

	<Accordion>
		{#each modPacks as modPack}
			<AccordionItem>
				<svelte:fragment slot="summary">{modPack.title}</svelte:fragment>
				<svelte:fragment slot="content">
					<ModCard
						title={modPack.title}
						note={modPack.note}
						downloadLinks={modPack.downloadLinks}
					/>
				</svelte:fragment>
			</AccordionItem>
		{/each}
	</Accordion>
</section>
