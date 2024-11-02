<script lang="ts">
	import {
		pageHeader,
		GettingStarted,
		MapGear,
		StatsSettings,
		UnityModManager,
		TabSwitcher
	} from '$lib';

	const { title, description, heading } = pageHeader.guides;

	// Define the tabs for the guides page
	const tabs = [
		{ id: 'gettingStarted', label: 'Getting Started', component: GettingStarted },
		{ id: 'mapGear', label: 'Map & Gear', component: MapGear },
		{ id: 'statsSettings', label: 'Stats & Settings', component: StatsSettings },
		{ id: 'unityModManager', label: 'Unity Mod Manager', component: UnityModManager }
	];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<section>
	<h1>{heading}</h1>
	<p>{description}</p>
	<hr />
</section>

<!-- Use TabSwitcher with the defined tabs -->
<TabSwitcher {tabs} />
