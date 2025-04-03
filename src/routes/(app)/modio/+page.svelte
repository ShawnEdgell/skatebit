<script lang="ts">
	import type { ModsData } from '$lib/types/modio';

	// Load data is passed as a single prop called "data"
	export let data: ModsData;
	const { gearMods, mapMods, scriptMods } = data;

	const pageTitle = 'mod.io';
	const pageDescription = 'Latest mods from mod.io for Skater XL.';
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1 class="text-3xl font-bold">
		{pageTitle} <span class="badge badge-sm lg:badge-md badge-info">Beta</span>
	</h1>
	<p class="mb-4">{pageDescription}</p>
	<div class="divider"></div>
</section>

<!-- (Optional) Debug Output -->
<!--
<section class="mb-8">
	<h2 class="text-lg font-bold">Debug Output</h2>
	<pre class="bg-base-200 rounded p-4">{JSON.stringify({ gearMods, mapMods, scriptMods }, null, 2)}</pre>
</section>
-->

<!-- Gear Mods Section -->
<section class="mt-8">
	<h2 class="mb-4 text-2xl font-bold">Recent Gear</h2>
	{#if gearMods && gearMods.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each gearMods as mod}
				<div class="card bg-base-200 not-prose justify-between rounded p-4 shadow">
					<img
						src={mod.logo.thumb_320x180}
						alt="{mod.name} thumbnail"
						class="mb-2 w-full object-cover"
					/>
					<div>
						<a
							class="font-semibold"
							href={mod.profile_url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{mod.name}
						</a>
					</div>
					<a
						href={mod.modfile.download.binary_url}
						class="btn btn-sm btn-primary mt-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						Download
					</a>
				</div>
			{/each}
		</div>
		<!-- View All button for Gear -->
		<div class="mt-4 text-center">
			<a
				href="https://mod.io/g/skaterxl?tags-in=Gear"
				class="btn btn-soft"
				target="_blank"
				rel="noopener noreferrer"
			>
				View All Gear
			</a>
		</div>
	{:else}
		<p>No gear mods found.</p>
	{/if}
</section>

<!-- Map Mods Section -->
<section class="mt-8">
	<h2 class="mb-4 text-2xl font-bold">Recent Maps</h2>
	{#if mapMods && mapMods.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each mapMods as mod}
				<div class="card bg-base-200 not-prose justify-between rounded p-4 shadow">
					<img
						src={mod.logo.thumb_320x180}
						alt="{mod.name} thumbnail"
						class="mb-2 w-full object-cover"
					/>
					<a class="font-semibold" href={mod.profile_url} target="_blank" rel="noopener noreferrer">
						{mod.name}
					</a>
					<a
						href={mod.modfile.download.binary_url}
						class="btn btn-sm btn-primary mt-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						Download
					</a>
				</div>
			{/each}
		</div>
		<!-- View All button for Maps -->
		<div class="mt-4 text-center">
			<a
				href="https://mod.io/g/skaterxl?tags-in=Map"
				class="btn btn-soft"
				target="_blank"
				rel="noopener noreferrer"
			>
				View All Maps
			</a>
		</div>
	{:else}
		<p>No map mods found.</p>
	{/if}
</section>

<!-- Script Mods Section -->
<section class="mt-8">
	<h2 class="mb-4 text-2xl font-bold">Recent Scripts</h2>
	{#if scriptMods && scriptMods.length > 0}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each scriptMods as mod}
				<div class="card bg-base-200 not-prose justify-between rounded p-4 shadow">
					<img
						src={mod.logo.thumb_320x180}
						alt="{mod.name} thumbnail"
						class="mb-2 w-full object-cover"
					/>
					<a class="font-semibold" href={mod.profile_url} target="_blank" rel="noopener noreferrer">
						{mod.name}
					</a>
					<a
						href={mod.modfile.download.binary_url}
						class="btn btn-sm btn-primary mt-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						Download
					</a>
				</div>
			{/each}
		</div>
		<!-- View All button for Scripts -->
		<div class="mt-4 text-center">
			<a
				href="https://mod.io/g/skaterxl?tags-in=Script"
				class="btn btn-soft"
				target="_blank"
				rel="noopener noreferrer"
			>
				View All Scripts
			</a>
		</div>
	{:else}
		<p>No script mods found.</p>
	{/if}
</section>
