<script lang="ts">
	import { alphaMods, publicMods, decalFix } from '$lib/data/modData';

	const tabs = [
		{ id: 'alphaMods', label: 'Skater XL v1.2.2.8 (Alpha)', mods: alphaMods },
		{ id: 'publicMods', label: 'Skater XL v1.2.10.4 (Public)', mods: publicMods }
	];

	const badgeClassMap: Record<string, string> = {
		Essential: 'badge-success',
		Recommended: 'badge-warning',
		New: 'badge-info',
		Deprecated: 'badge-error',
		Experimental: 'badge-secondary'
	};

	let selectedTab = tabs[0].id;
</script>

<section>
	<!-- Tab Selector -->
	<div class="mt-6 flex flex-col">
		{#each tabs as tab}
			<button
				class="btn w-full {selectedTab === tab.id ? 'btn-primary' : 'btn-base'}"
				on:click={() => {
					selectedTab = tab.id;
					requestAnimationFrame(() => {
						dispatchEvent(new CustomEvent('refresh-toc'));
					});
				}}
				aria-label={tab.label}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Tab Content -->
	<div class="mt-16">
		<h2>{selectedTab === 'alphaMods' ? 'Alpha Mod List' : 'Public Mod List'}</h2>

		{#each tabs as tab}
			{#if selectedTab === tab.id}
				<div>
					{#each tab.mods as modItem, modIndex}
						<div class="collapse-arrow bg-base-200 collapse mb-3">
							<input type="checkbox" class="peer hidden" id={`mod-${tab.id}-${modIndex}`} />

							<label
								for={`mod-${tab.id}-${modIndex}`}
								class="collapse-title flex cursor-pointer items-center gap-2 px-4 py-3 font-semibold transition-all duration-300"
							>
								{#if modItem.badge}
									<span class={`badge badge-sm ${badgeClassMap[modItem.badge] || 'badge-ghost'}`}>
										{modItem.badge}
									</span>
								{/if}
								{modItem.title}
							</label>

							<div class="collapse-content px-4 text-sm leading-relaxed">
								<ul class="list-disc space-y-1 pl-5">
									<li><strong>Author:</strong> {modItem.author || 'Unknown'}</li>
									<li><strong>Working Version:</strong> {modItem.workingVersion || 'N/A'}</li>
									{#if modItem.keybind}
										<li><strong>Keybind:</strong> {modItem.keybind}</li>
									{/if}
									{#if modItem.features?.length}
										<li><strong>Features:</strong> {modItem.features.join(', ')}</li>
									{/if}
									{#if modItem.note}
										<li><strong>Note:</strong> {modItem.note}</li>
									{/if}
								</ul>

								{#if modItem.downloadLinks?.length}
									<div class="mt-4 flex flex-wrap gap-2">
										{#each modItem.downloadLinks as { url, label }}
											<a
												class="btn btn-primary btn-outline mt-2"
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

					{#if tab.id === 'alphaMods'}
						<!-- Decal Fix Section -->
						<div class="mt-10">
							<h3 class="mb-4 text-lg font-bold">Decal Fix</h3>
							<p>
								This is not a regular script mod and does not go into Unity Mod Manager. To install,
								extract the ZIP and replace the globalgamemanagers.assets file in your SkaterXL_Data
								folder (within your Skater XL game folder).
							</p>
							{#each decalFix as modItem, modIndex}
								<div class="collapse-arrow bg-base-200 collapse mb-3">
									<input type="checkbox" class="peer hidden" id={`mod-decalFix-${modIndex}`} />

									<label
										for={`mod-decalFix-${modIndex}`}
										class="collapse-title flex cursor-pointer items-center gap-2 px-4 py-3 font-semibold transition-all duration-300"
									>
										{#if modItem.badge}
											<span
												class={`badge badge-sm ${badgeClassMap[modItem.badge] || 'badge-ghost'}`}
											>
												{modItem.badge}
											</span>
										{/if}
										{modItem.title}
									</label>

									<div class="collapse-content px-4 text-sm leading-relaxed">
										<ul class="list-disc space-y-1 pl-5">
											<li><strong>Author:</strong> {modItem.author || 'Unknown'}</li>
											<li><strong>Working Version:</strong> {modItem.workingVersion || 'N/A'}</li>
											{#if modItem.keybind}
												<li><strong>Keybind:</strong> {modItem.keybind}</li>
											{/if}
											{#if modItem.features?.length}
												<li><strong>Features:</strong> {modItem.features.join(', ')}</li>
											{/if}
											{#if modItem.note}
												<li><strong>Note:</strong> {modItem.note}</li>
											{/if}
										</ul>

										{#if modItem.downloadLinks?.length}
											<div class="mt-4 flex flex-wrap gap-2">
												{#each modItem.downloadLinks as { url, label }}
													<a
														class="btn btn-primary btn-outline mt-2"
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
				</div>
			{/if}
		{/each}
	</div>
</section>
