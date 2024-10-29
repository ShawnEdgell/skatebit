<script lang="ts">
	import Header from '../../../components/Header.svelte';
	import MapGearSection from './MapGearSection.svelte';
	import Step1CheckVersion from './Step1CheckVersion.svelte';
	import Step2ChangeVersion from './Step2ChangeVersion.svelte';
	import Step3DownloadUnityModManager from './Step3DownloadUnityModManager.svelte';
	import Step4SetupUnityModManager from './Step4SetupUnityModManager.svelte';
	import Step5InstallMods from './Step5InstallMods.svelte';
	import Step6LaunchGame from './Step6LaunchGame.svelte';
	import VideoItem from '../../../components/VideoItem.svelte';
	import { videos } from './videoData';
</script>

<svelte:head>
	<title>Skatebit | Guides</title>
	<meta
		name="description"
		content="Learn how to get started with Skater XL modding. Follow our step-by-step guide to install mods, maps, and gear."
	/>
</svelte:head>

<Header
	title="Guides"
	description="Essential guides and tutorials to help you master Skater XL mods, gameplay, and customization."
/>

<MapGearSection />
<hr />

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

<section>
	{#each videos as video}
		<VideoItem {video} showDate={false} />
	{/each}
</section>
