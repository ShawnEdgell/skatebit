<script lang="ts">
	import { alphaMods, publicMods } from '$lib'; // Adjust the import path as needed

	// Define the tabs
	const tabs = [
		{ id: 'alphaMods', label: 'Skater XL v1.2.2.8 (Alpha)', mods: alphaMods },
		{ id: 'publicMods', label: 'Skater XL v1.2.10.4 (Public)', mods: publicMods }
	];

	// Initialize the active tab to the first one
	let activeTab = tabs[0].id;
</script>

<section>
	<h2 class="text-2xl font-bold mb-4">Working Mod List</h2>
	<p class="mb-6">Select your game version below to view a list of compatible mods.</p>

	<!-- Tabs Navigation -->
	<div class="flex flex-wrap gap-2 justify-center">
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
	<div class="space-y-4 not-prose mt-8">
		{#each tabs as tab}
			{#if activeTab === tab.id}
				<div>
					{#each tab.mods as modItem, index}
						<div
							class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-2"
						>
							<input
								type="radio"
								name={`mod-accordion-${tab.id}`}
								id={`mod-${tab.id}-${index}`}
								class="peer"
							/>
							<label
								for={`mod-${tab.id}-${index}`}
								class="collapse-title text-xl font-medium cursor-pointer"
							>
								{modItem.title}
							</label>
							<div class="collapse-content">
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
									<p><strong>Download Links:</strong></p>
									<div class="flex flex-wrap gap-2 mt-2">
										{#each modItem.downloadLinks as { url, label }}
											<li>
												<a
													class="text-blue-500 underline"
													href={url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{label}
												</a>
											</li>
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
