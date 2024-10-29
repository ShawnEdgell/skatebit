<script lang="ts">
	import Header from '../../../components/Header.svelte';
	import ModPackSection from './ModPackSection.svelte';
	import ModListSection from './ModListSection.svelte';
	import SoundPackSection from './SoundPackSection.svelte';
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

<ModListSection />
<hr />
<ModPackSection />
<hr />
<SoundPackSection />
