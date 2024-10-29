<script lang="ts">
	import Header from '../../../components/Header.svelte';
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

<Header
	title="Mods"
	description="For help with installation, visit our Guides section or ask us questions on Discord."
/>

<WorkingModListSection />
<hr />
<ModPackSection />
<hr />
<SoundPackSection />
