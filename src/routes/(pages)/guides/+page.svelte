<script lang="ts">
	import HowToInstallSection from './components/HowToInstallSection.svelte';
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

	let tabSet: number = 0;
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
	<hr />
</header>

<div class="logo-cloud grid-cols-1 sm:!grid-cols-2 gap-1">
	<button
		class="btn py-4 rounded-none logo-item no-underline"
		on:click={() => (tabSet = 0)}
		class:selected={tabSet === 0}
	>
		<span>Getting Started Guide</span>
	</button>
	<button
		class="btn py-4 rounded-none logo-item no-underline"
		on:click={() => (tabSet = 1)}
		class:selected={tabSet === 1}
	>
		<span>Maps & Gear</span>
	</button>
	<button
		class="btn py-4 rounded-none logo-item no-underline"
		on:click={() => (tabSet = 2)}
		class:selected={tabSet === 2}
	>
		<span>Stats & Settings</span>
	</button>
	<button
		class="btn py-4 rounded-none logo-item no-underline"
		on:click={() => (tabSet = 3)}
		class:selected={tabSet === 3}
	>
		<span>Video Guides</span>
	</button>
</div>

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
			<VideoItem {video} showDate={false} />
		{/each}
	</section>
{/if}
