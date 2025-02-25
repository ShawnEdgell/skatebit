<script lang="ts">
	import ModListSection from './ModListSection.svelte';

	const tabs = [{ id: 'modList', label: 'Working Mod List', component: ModListSection }];
</script>

<svelte:head>
	<title>Skatebit | Mods</title>
	<meta name="description" content="A list of working mods for Skater XL." />
</svelte:head>

<h1>Mods</h1>
<p>
	For help with installation, visit our <a href="/guides" class="hover:no-underline">Guides</a>
	section or ask us questions on
	<a class="hover:no-underline" href="https://discord.gg/G9aW5uV" target="_blank">Discord.</a>
</p>
<div class="divider"></div>

<main>
	<article>
		<ModListSection />
	</article>
</main>
