<script lang="ts">
	import Badge from '../../../components/Badge.svelte';
	import ModioSection from './components/ModioSection.svelte';
	import XlHubSection from './components/XLHubSection.svelte';
	import TableSection from './components/TableSection.svelte';
	import { categories } from './linksData';
</script>

<svelte:head>
	<title>Skatebit | Helpful Links</title>
	<meta
		name="description"
		content="Discover popular Skater XL Discord servers and websites for additional mods, tutorials, and communities."
	/>
</svelte:head>

<header>
	<Badge />
	<h1>Helpful Links</h1>
	<p>Find essential Discord and website links for Skater XL mods, tutorials, and communities.</p>
	<hr />
</header>

<ModioSection />
<XlHubSection />
<hr />
<TableSection {categories} />
