<script lang="ts">
	import Badge from '../../../components/Badge.svelte';
	import MapGearSection from './components/MapGearSection.svelte';
	import Step1CheckVersion from './components/Step1CheckVersion.svelte';
	import Step2ChangeVersion from './components/Step2ChangeVersion.svelte';
	import Step3DownloadUnityModManager from './components/Step3DownloadUnityModManager.svelte';
	import Step4SetupUnityModManager from './components/Step4SetupUnityModManager.svelte';
	import Step5InstallMods from './components/Step5InstallMods.svelte';
	import Step6LaunchGame from './components/Step6LaunchGame.svelte';
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

<header>
	<Badge />
	<h1>Guides</h1>
	<p>
		Essential guides and tutorials to help you master Skater XL mods, gameplay, and customization.
	</p>
</header>

<hr />
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
