<script lang="ts">
	import ModListSection from './ModListSection.svelte';
	import Help from '$lib/components/Help.svelte';

	const pageTitle = 'Mods';
	const pageDescription = 'A list of working mods for Skater XL.';
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<h1>{pageTitle}</h1>
<Help />
<div class="divider"></div>

<section>
	<ModListSection />
</section>
