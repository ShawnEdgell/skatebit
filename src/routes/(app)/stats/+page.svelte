<script lang="ts">
	import Divider from '$lib/components/layout/Divider.svelte';
	import EssentialSettings from './EssentialSettings.svelte';
	import Presets from './Presets.svelte';

	const pageTitle = 'Stats & Settings';
	const pageDescription = 'Download presets for your Skater XL mods.';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>
		For help with installation, visit our <a href="/guides" class="hover:no-underline">Guides</a>
		section or ask us questions on
		<a class="hover:no-underline" href="https://discord.gg/G9aW5uV" target="_blank">Discord.</a>
	</p>
	<Divider />
</section>

<Presets />
<EssentialSettings />
