<script lang="ts">
	import { alphaMods, publicMods } from '$lib/data/modData'; // Adjust the import path as needed

	// Define the tabs
	const tabs = [
		{ id: 'alphaMods', label: 'Skater XL v1.2.2.8 (Alpha)', mods: alphaMods },
		{ id: 'publicMods', label: 'Skater XL v1.2.10.4 (Public)', mods: publicMods }
	];

	// Initialize the active tab to the first one
	let activeTab = tabs[0].id;
</script>

<section>
	<h2>Working Mod List</h2>
	<p class="mb-6">Select your game version below to view a list of compatible mods.</p>

	<!-- Tabs Navigation -->
	<div class="my-8 flex flex-wrap justify-center gap-2">
		{#each tabs as tab}
			<button
				type="button"
				class="btn"
				class:btn-warning={activeTab === tab.id}
				on:click={() => (activeTab = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Tabs Content -->
	<div class="not-prose mt-8 space-y-4">
		{#each tabs as tab}
			{#if activeTab === tab.id}
				{#each tab.mods as modItem, index}
					<div class="collapse-arrow border-base-300 bg-base-100 rounded-box collapse mb-2 border">
						<input
							type="radio"
							name={`mod-accordion-${tab.id}`}
							id={`mod-${tab.id}-${index}`}
							class="peer"
						/>
						<label
							for={`mod-${tab.id}-${index}`}
							class="collapse-title cursor-pointer text-xl font-medium"
						>
							<div class="flex items-center gap-3">
								{modItem.title}
							</div>
						</label>
						<div class="collapse-content space-y-2">
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
								<p><strong>Links:</strong></p>

								<div class="flex flex-col gap-2">
									{#each modItem.downloadLinks as { url, label }}
										<a class="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">
											{label}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		{/each}
	</div>
</section>
