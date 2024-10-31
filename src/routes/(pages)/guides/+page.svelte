<script lang="ts">
	import HowToInstallSection from './components/HowToInstallSection.svelte';
	import MapGearSection from './components/MapGearSection.svelte';
	import Step1CheckVersion from './components/Step1CheckVersion.svelte';
	import Step2ChangeVersion from './components/Step2ChangeVersion.svelte';
	import Step3DownloadUnityModManager from './components/Step3DownloadUnityModManager.svelte';
	import Step4SetupUnityModManager from './components/Step4SetupUnityModManager.svelte';
	import Step5InstallMods from './components/Step5InstallMods.svelte';
	import Step6LaunchGame from './components/Step6LaunchGame.svelte';
	import VideoItem from '../../../components/VideoItem.svelte';
	import { videos } from './videoData';
	import TabNavigation from '../../../components/TabNavigation.svelte';

	let tabSet: number = 0;

	const tabLinks = [
		{ name: 'getting-started', label: 'Getting Started Guide' },
		{ name: 'maps-gear', label: 'Maps & Gear' },
		{ name: 'stats-settings', label: 'Stats & Settings' },
		{ name: 'video-guides', label: 'Video Guides' }
	];

	const handleTabChange = (e: CustomEvent<number>) => {
		tabSet = e.detail;
	};
</script>

<svelte:head>
	<title>Skatebit | Guides</title>
	<meta
		name="description"
		content="Learn how to get started with Skater XL modding. Follow our step-by-step guide to install mods, maps, and gear."
	/>
</svelte:head>

<header>
	<h1>Guides</h1>
	<p>
		Essential guides and tutorials to help you master Skater XL mods, gameplay, and customization.
	</p>
	<hr />
</header>

<TabNavigation
	{tabLinks}
	{tabSet}
	columns="grid-cols-1 sm:!grid-cols-2"
	on:tabChange={handleTabChange}
/>
{#if tabSet === 0}
	<section>
		<h2>Getting Started with Skater XL Modding</h2>
		<p>
			This guide will walk you through the essential steps to get you up and running with all the
			latest mods.
		</p>
		<Step1CheckVersion />
		<Step2ChangeVersion />
		<Step3DownloadUnityModManager />
		<Step4SetupUnityModManager />
		<Step5InstallMods />
		<Step6LaunchGame />
	</section>
{:else if tabSet === 1}
	<MapGearSection />
{:else if tabSet === 2}
	<section>
		<HowToInstallSection />
	</section>
{:else if tabSet === 3}
	<section>
		{#each videos as video}
			<div class="mt-12">
				<VideoItem {video} showDate={false} />
			</div>
		{/each}
	</section>
{/if}
