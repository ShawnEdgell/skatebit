<script lang="ts">
	import { TabGroup, Tab, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { mods } from './modsData'; // Ensure this path matches the location of your mods data file

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
			// Add more cases as needed
			default:
				return 'badge';
		}
	}
</script>

<Accordion>
	{#each mods[tabSet].modItems as { title, author, keybind, features, note, badge, downloadLinks }}
		<AccordionItem>
			<svelte:fragment slot="lead">
				{#if badge}
					<!-- Use the getBadgeClass function to determine the class -->

					<div class={getBadgeClass(badge)}>{badge}</div>
				{/if}
			</svelte:fragment>
			<svelte:fragment slot="summary">{title}</svelte:fragment>
			<svelte:fragment slot="content">
				<div class="card p-4 space-y-4">
					<div><h3 class="h3">{title}</h3></div>
					<div><strong>Author:</strong> <span class="font-normal">{author}</span></div>
					<div><strong>Keybind:</strong> <span class="font-normal">{keybind}</span></div>
					<div>
						<strong>Features:</strong>
						<ul class="list-disc pl-5">
							{#each features as feature}
								<li class="font-normal">{feature}</li>
							{/each}
						</ul>
					</div>
					{#if note}
						<div>
							<strong>Note:</strong> <span class="font-normal">{note}</span>
						</div>
					{/if}
					<div class="flex items-start gap-4">
						{#each downloadLinks as { url, label }}
							<a
								href={url}
								class="btn variant-filled-secondary"
								rel="noopener noreferrer"
								target="_blank">{label}</a
							>
						{/each}
					</div>
				</div>
			</svelte:fragment>
		</AccordionItem>
	{/each}
</Accordion>
