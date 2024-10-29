<script lang="ts">
	import Badge from '../../../components/Badge.svelte';
	import ModPackSection from './components/ModPackSection.svelte';
	import WorkingModListSection from './components/WorkingModListSection.svelte';
	import SoundPackSection from './components/SoundPackSection.svelte';
</script>

<svelte:head>
	<title>Skatebit | Mods</title>
	<meta
		name="description"
		content="Everything you need to start modding Skater XL mods, including UnityModManager, XL Hub, mod packs, and working mod lists."
	/>
</svelte:head>

<header>
	<Badge />
	<h1>Mods</h1>
	<p>
		For help with installation, visit our
		<a href="/guides">Guides</a> section or ask us questions on
		<a href="https://discord.gg/359SwZ3atS" target="_blank">Discord.</a>
	</p>
</header>

<hr />
<WorkingModListSection />
<hr />
<ModPackSection />
<hr />
<SoundPackSection />
