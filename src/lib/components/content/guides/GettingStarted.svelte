<script lang="ts">
	import VideoGuide from './VideoGuide.svelte';
	import Step1CheckGameVersion from './Step1CheckGameVersion.svelte';
	import Step2ChangeGameVersion from './Step2ChangeGameVersion.svelte';
	import Step3DownloadUnityModManager from './Step3DownloadUnityModManager.svelte';
	import Step4SetupUnityModManager from './Step4SetupUnityModManager.svelte';
	import Step5DownloadMods from './Step5DownloadMods.svelte';
	import Step6LaunchGame from './Step6LaunchGame.svelte';
</script>

<section>
	<p>
		This guide will walk you through the essential steps to get you up and running with all the
		latest mods.
	</p>
	<VideoGuide />
	<Step1CheckGameVersion />
	<Step2ChangeGameVersion />
	<Step3DownloadUnityModManager />
	<Step4SetupUnityModManager />
	<Step5DownloadMods />
	<Step6LaunchGame />
</section>
