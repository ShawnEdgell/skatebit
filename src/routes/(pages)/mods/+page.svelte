<script lang="ts">
	import ModPackSection from './components/ModPackSection.svelte';
	import WorkingModListSection from './components/WorkingModListSection.svelte';
	import SoundPackSection from './components/SoundPackSection.svelte';
	import TabNavigation from '../../../components/TabNavigation.svelte';

	let tabSet: number = 0;

	const tabLinks = [
		{ name: 'working-mod-list', label: 'Working Mod List' },
		{ name: 'mod-packs', label: 'Mod Packs' },
		{ name: 'sound-packs', label: 'Sound Packs' }
	];

	const handleTabChange = (e: CustomEvent<number>) => {
		tabSet = e.detail;
	};
</script>

<svelte:head>
	<title>Skatebit | Mods</title>
	<meta
		name="description"
		content="Everything you need to start modding Skater XL mods, including UnityModManager, XL Hub, mod packs, and working mod lists."
	/>
</svelte:head>

<header>
	<h1>Mods</h1>
	<p>
		For help with installation, visit our
		<a href="/guides#stats-settings">Guides</a> section or ask us questions on
		<a href="https://discord.gg/359SwZ3atS" target="_blank">Discord.</a>
	</p>
	<hr />
</header>

<TabNavigation
	{tabLinks}
	{tabSet}
	columns="grid-cols-1 sm:!grid-cols-3"
	on:tabChange={handleTabChange}
/>

{#if tabSet === 0}
	<section>
		<WorkingModListSection />
	</section>
{:else if tabSet === 1}
	<section>
		<ModPackSection />
	</section>
{:else if tabSet === 2}
	<section>
		<SoundPackSection />
	</section>
{/if}
