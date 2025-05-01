<script lang="ts">
	import Divider from '$lib/components/layout/Divider.svelte';
	import ModListSection from './ModListSection.svelte';

	const pageTitle = 'Mods';
	const pageDescription = 'Select your game version below to view a list of compatible mods.';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<Divider />
</section>

<!-- Mod List Section -->
<section>
	<ModListSection />
</section>
