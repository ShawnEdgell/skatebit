<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { sounds } from '../soundsData';
	import ModCard from '../../../../components/ModCard.svelte';
</script>

<section>
	<h2>Sound Packs</h2>
	<p>Download sound packs for the Soundmod to enhance your Skater XL experience.</p>

	<Accordion>
		{#each sounds as sound}
			{#each sound.modItems as modItem}
				<AccordionItem>
					<svelte:fragment slot="summary">{modItem.title}</svelte:fragment>
					<svelte:fragment slot="content">
						<ModCard
							title={modItem.title}
							note={modItem.note}
							downloadLinks={modItem.downloadLinks}
						/>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		{/each}
	</Accordion>
</section>
