<script lang="ts">
	import Header from '../../../components/Header.svelte';
	import ModioSection from './ModioSection.svelte';
	import XlHubSection from './XLHubSection.svelte';
	import TableSection from './TableSection.svelte';
	import { categories } from './linksData';
</script>

<svelte:head>
	<title>Skatebit | Helpful Links</title>
	<meta
		name="description"
		content="Discover popular Skater XL Discord servers and websites for additional mods, tutorials, and communities."
	/>
</svelte:head>

<Header
	title="Helpful Links"
	description="Find essential Discord and website links for Skater XL mods, tutorials, and communities,
   connecting you with the creators and content that enhance your gaming experience."
/>

<ModioSection />
<hr />
<XlHubSection />
<hr />
<TableSection {categories} />
