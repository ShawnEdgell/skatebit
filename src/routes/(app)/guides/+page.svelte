<script lang="ts">
	import GettingStarted from './GettingStarted.svelte';
	import MapsGear from './MapsGear.svelte';
	import StatsSettings from './StatsSettings.svelte';
	import VideoGuides from './VideoGuides.svelte';

	const pageTitle = 'Guides';
	const pageDescription =
		'These guides will walk you through the essential steps to get you up and running with all the latest mods.';

	// Define the tabs with their labels and IDs
	const tabs = [
		{ id: 'gettingStarted', label: 'Getting Started' },
		{ id: 'mapsGear', label: 'Maps & Gear' },
		{ id: 'statsSettings', label: 'Stats & Settings' },
		{ id: 'videoGuides', label: 'Video Guides' }
	];

	// Initialize the selected tab (first tab by default)
	let selectedTab = tabs[0].id;
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider mb-6"></div>
</section>

<!-- Tab Selector using buttons -->
<div class="flex flex-col">
	{#each tabs as tab}
		<button
			class="btn w-full {selectedTab === tab.id ? 'btn-primary' : 'btn-base'}"
			on:click={() => (selectedTab = tab.id)}
			aria-label={tab.label}
		>
			{tab.label}
		</button>
	{/each}
</div>

<!-- Tab Content -->
<section>
	{#if selectedTab === 'gettingStarted'}
		<GettingStarted />
	{:else if selectedTab === 'mapsGear'}
		<MapsGear />
	{:else if selectedTab === 'statsSettings'}
		<StatsSettings />
	{:else if selectedTab === 'videoGuides'}
		<VideoGuides />
	{/if}
</section>
