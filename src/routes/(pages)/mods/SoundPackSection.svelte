<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { sounds } from './soundsData';
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
						<div class="card p-4">
							<div class="font-bold text-lg lg:text-2xl mb-4">{modItem.title}</div>
							{#if modItem.note}
								<div>
									<strong>Note:</strong> <span>{modItem.note}</span>
								</div>
							{/if}
							<div class="flex items-start">
								{#each modItem.downloadLinks as { url, label }}
									<a
										href={url}
										class="mt-4 btn mr-2 variant-filled-secondary no-underline"
										target="_blank"
										rel="noopener noreferrer">{label}</a
									>
								{/each}
							</div>
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		{/each}
	</Accordion>
</section>
