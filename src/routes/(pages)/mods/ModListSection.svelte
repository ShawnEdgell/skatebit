<script lang="ts">
	import { TabGroup, Tab, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { mods } from './modsData';

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
								<div class="card p-4">
									<div class="font-bold text-lg lg:text-2xl mb-4">{modItem.title}</div>
									<div><strong>Author:</strong> <span>{modItem.author}</span></div>
									<div>
										<strong>Working Version:</strong>
										<span>{modItem.workingVersion}</span>
									</div>
									<div><strong>Keybind:</strong> <span>{modItem.keybind}</span></div>
									<div>
										<strong>Features:</strong>
										<span>
											{#each modItem.features as feature, i}
												{feature}{#if i < modItem.features.length - 1},
												{/if}
											{/each}
										</span>
									</div>
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
				</Accordion>
			{/if}
		</svelte:fragment>
	</TabGroup>
</section>
