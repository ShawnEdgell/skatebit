<script lang="ts">
	import { TabGroup, Tab, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { mods } from '../modsData';
	import ModCard from '../../../../components/ModCard.svelte';

	let tabSet: number = 0;

	function getBadgeClass(badgeName: string): string {
		switch (badgeName) {
			case 'Essential':
				return 'badge variant-filled';
			case 'New':
				return 'badge variant-filled-success';
			case 'Recommended':
				return 'badge variant-filled-secondary';
			case 'Useful':
				return 'badge variant-filled-primary';
			case 'Fun':
				return 'badge variant-filled-warning';
			default:
				return 'badge';
		}
	}
</script>

<section>
	<h2>Working Mod List</h2>
	<p>Select your game version below to browse a curated list of compatible mods.</p>
	<TabGroup>
		{#each mods as { tab, version }, tabIndex}
			<Tab bind:group={tabSet} name={`tab${tabIndex}`} value={tabIndex}>
				<svelte:fragment slot="lead">
					<strong>{tab}</strong>
				</svelte:fragment>
				<span>{version}</span>
			</Tab>
		{/each}

		<svelte:fragment slot="panel">
			{#if tabSet < mods.length}
				<Accordion>
					{#each mods[tabSet].modItems as modItem}
						<AccordionItem>
							<svelte:fragment slot="lead">
								{#if modItem.badge}
									<div class={getBadgeClass(modItem.badge)}>{modItem.badge}</div>
								{/if}
							</svelte:fragment>
							<svelte:fragment slot="summary">{modItem.title}</svelte:fragment>
							<svelte:fragment slot="content">
								<ModCard
									title={modItem.title}
									author={modItem.author}
									workingVersion={modItem.workingVersion}
									keybind={modItem.keybind}
									features={modItem.features}
									note={modItem.note}
									downloadLinks={modItem.downloadLinks}
								/>
							</svelte:fragment>
						</AccordionItem>
					{/each}
				</Accordion>
			{/if}
		</svelte:fragment>
	</TabGroup>
</section>
