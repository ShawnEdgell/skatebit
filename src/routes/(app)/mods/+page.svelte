<script lang="ts">
	import ModListSection from './ModListSection.svelte';
	import Help from '$lib/components/Help.svelte';

	const pageTitle = 'Mods';
	const pageDescription = 'A list of working mods for Skater XL.';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<Help />
	<div class="divider"></div>
</section>
<!-- Mod List Section -->
<section>
	<ModListSection />
</section>
