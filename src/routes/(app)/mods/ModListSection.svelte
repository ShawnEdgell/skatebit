<script lang="ts">
	import { alphaMods, publicMods } from '$lib/data/modData';

	// Define the tabs with their respective mod lists
	const tabs = [
		{ id: 'alphaMods', label: 'Skater XL v1.2.2.8 (Alpha)', mods: alphaMods },
		{ id: 'publicMods', label: 'Skater XL v1.2.10.4 (Public)', mods: publicMods }
	];

	// Track the selected tab
	let selectedTab = tabs[0].id;
</script>

<section>
	<h2>Working Mod List</h2>
	<p class="mb-6">Select your game version below to view a list of compatible mods.</p>

	<!-- Tab Selector -->
	<div class="flex flex-col">
		{#each tabs as tab}
			<button
				class="btn w-full {selectedTab === tab.id ? 'btn-primary' : 'btn-base'}"
				on:click={() => (selectedTab = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Tab Content -->
	<div class="mt-6">
		{#each tabs as tab}
			{#if selectedTab === tab.id}
				<div>
					{#each tab.mods as modItem, modIndex}
						<div
							class="collapse-arrow border-base-200 bg-base-200 rounded-box not-prose collapse mb-2 border"
						>
							<input type="checkbox" class="peer hidden" id={`mod-${tab.id}-${modIndex}`} />
							<label
								for={`mod-${tab.id}-${modIndex}`}
								class="collapse-title cursor-pointer text-xl font-medium"
							>
								{#if modItem.badge}
									<span class="badge badge-soft badge-success badge-sm mr-2">{modItem.badge}</span>
								{/if}
								{modItem.title}
							</label>
							<div class="collapse-content hidden space-y-2 p-4 peer-checked:block">
								<p><strong>Author:</strong> {modItem.author || 'Unknown'}</p>
								<p><strong>Working Version:</strong> {modItem.workingVersion || 'N/A'}</p>
								{#if modItem.keybind}
									<p><strong>Keybind:</strong> {modItem.keybind}</p>
								{/if}
								{#if modItem.features && modItem.features.length > 0}
									<p><strong>Features:</strong> {modItem.features.join(', ')}</p>
								{/if}
								{#if modItem.note}
									<p><strong>Note:</strong> {modItem.note}</p>
								{/if}
								{#if modItem.downloadLinks && modItem.downloadLinks.length > 0}
									<div class="mt-4 flex flex-col gap-2">
										{#each modItem.downloadLinks as { url, label }}
											<a
												class="btn btn-soft no-underline"
												href={url}
												target="_blank"
												rel="noopener noreferrer"
											>
												{label}
											</a>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</section>
