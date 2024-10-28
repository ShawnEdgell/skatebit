<script lang="ts">
	import VideoItem from '../../../components/VideoItem.svelte';
	import UnityDownload from '../../../components/UnityDownload.svelte';
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
	<span class="badge variant-filled-primary mb-2">Skater XL</span>
	<h1>Guides</h1>
	<p>
		Essential guides and tutorials to help you master Skater XL mods, gameplay, and customization.
	</p>
	<hr />
</header>

<section>
	<h2>Maps &amp; Gear</h2>
	<p>
		To install custom maps and gear, simply place them in the following directories. Make sure to
		extract the files from the ZIP folder!
	</p>
	<blockquote class="blockquote lg:text-lg">
		Please note that XLGM gear requires you to install each piece of gear into two folders.
	</blockquote>

	<h3>Custom Maps:</h3>
	<pre>Documents/SkaterXL/Maps</pre>

	<h3>Custom Gear:</h3>
	<pre>Documents/SkaterXL/Gear</pre>

	<h3>XLGM Gear:</h3>
	<pre>Documents/SkaterXL/Gear</pre>

	<h3>XLGM Assets:</h3>
	<pre>Documents/SkaterXL/XLGearModifier/AssetPacks</pre>
</section>

<section>
	<hr />
	<h2>Getting Started with Skater XL Modding</h2>
	<p>
		This guide will walk you through the essential steps to get you up and running with all the
		latest mods.
	</p>

	<section>
		<h3>Step 1: Check Your Game Version</h3>
		<p>
			Ensure you know your Skater XL version, as mod compatibility varies by version. Check the
			version at launch in the lower-left corner; v1.2.2.8 and v1.2.10.4 are the most common.
		</p>
	</section>

	<section>
		<h3>Step 2: Changing Game Versions (Optional)</h3>
		<p>
			To switch versions, right-click <em>Skater XL</em> in Steam, select Properties &gt; Betas, then
			choose from the dropdown.
		</p>
	</section>

	<section>
		<h3>Step 3: Download UnityModManager</h3>
		<UnityDownload />
	</section>

	<section>
		<h3>Step 4: UnityModManager Setup</h3>
		<p>
			After downloading, unzip the file, open the folder, and run
			<strong>UnityModManager.exe.</strong>
		</p>
		<p>
			If you are playing on version 1.2.2.8 (Alpha), select 'Skater XL v1.2.2.8' as your game from
			the dropdown menu. If you are playing a different version, simply select 'Skater XL.'
		</p>
		<p>Set the game path to:</p>
		<pre>C:\ProgramFiles(x86)\Steam\steamapps\common\SkaterXL</pre>
		<p>
			Click <strong>"Install"</strong> or <strong>"Update"</strong> to complete the setup.
		</p>
	</section>

	<section>
		<h3>Step 5: Download and Install Mods</h3>
		<p>
			Download mods compatible with your game version and drop them into UnityModManager. Check our
			<a href="/mods">Mods</a> tab for a list of functional mods.
		</p>
	</section>

	<section>
		<h3>Step 6: Launch Skater XL</h3>
		<p>
			Start the game! If everything went well, UnityModManager will show up upon launch and all of
			your mods will be listed. Status: green means the mod is working. Status: red means the mod is
			not working and will need to be updated or removed.
		</p>
	</section>
</section>

<section class="pb-8">
	{#each videos as video}
		<VideoItem {video} />
	{/each}
</section>
