<script lang="ts">
	import {
		pageHeader,
		ModPackSection,
		ModListSection,
		SoundPackSection,
		Help,
		TabSwitcher
	} from '$lib';

	const { title, description, heading } = pageHeader.mods;

	const tabs = [
		{ id: 'modList', label: 'Working Mod List', component: ModListSection },
		{ id: 'modPacks', label: 'Mod Packs', component: ModPackSection },
		{ id: 'soundPacks', label: 'Sound Packs', component: SoundPackSection }
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<header>
	<h1>{heading}</h1>
	<p>{description}</p>
	<Help />
	<hr />
</header>

<main>
	<article>
		<TabSwitcher {tabs} />
	</article>
</main>
