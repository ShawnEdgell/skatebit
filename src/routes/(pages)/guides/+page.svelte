<script lang="ts">
	import {
		pageHeader,
		GettingStarted,
		MapGear,
		StatsSettings,
		UnityModManagerSection,
		TabSwitcher
	} from '$lib';

	const { title, description, heading } = pageHeader.guides;

	// Define the tabs for the guides page
	const tabs = [
		{ id: 'gettingStarted', label: 'Getting Started', component: GettingStarted },
		{ id: 'mapGear', label: 'Maps & Gear', component: MapGear },
		{ id: 'statsSettings', label: 'Stats & Settings', component: StatsSettings },
		{ id: 'unityModManager', label: 'Unity Mod Manager', component: UnityModManagerSection }
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<header>
	<h1>{heading}</h1>
	<p>{description}</p>
	<hr />
</header>

<main>
	<article>
		<TabSwitcher {tabs} />
	</article>
</main>
