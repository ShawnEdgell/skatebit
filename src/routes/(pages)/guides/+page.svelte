<script lang="ts">
	import UnityDownload from '../../../components/UnityDownload.svelte';
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

<!-- Header Section -->
<header>
	<span class="badge variant-filled-primary mb-2">Skater XL</span>
	<h1>Guides</h1>
	<p>
		Essential guides and tutorials to help you master Skater XL mods, gameplay, and customization.
	</p>
	<hr />
</header>

<!-- Maps & Gear Section -->
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
	<pre class="pre">Documents/SkaterXL/Maps</pre>

	<h3>Custom Gear:</h3>
	<pre class="pre">Documents/SkaterXL/Gear</pre>

	<h3>XLGM Gear:</h3>
	<pre class="pre">Documents/SkaterXL/Gear</pre>

	<h3>XLGM Assets:</h3>
	<pre class="pre">Documents/SkaterXL/XLGearModifier/Asset Packs</pre>
</section>

<!-- Getting Started Section -->
<section>
	<hr />
	<h2>Getting Started with Skater XL Modding</h2>
	<p>
		This guide will walk you through the essential steps to get you up and running with all the
		latest mods.
	</p>

	<!-- Step 1 -->

	<h3>Step 1: Check Your Game Version</h3>

	<section>
		Ensure you know your Skater XL version, as mod compatibility varies by version. Check the
		version at launch in the lower-left corner; v1.2.2.8 and v1.2.10.4 are the most common.
	</section>

	<!-- Step 2 -->

	<h3>Step 2: Changing Game Versions (Optional)</h3>
	<section>
		To switch versions, right-click <em>Skater XL</em> in Steam, select Properties &gt; Betas, then choose
		from the dropdown.
	</section>

	<!-- Step 3 -->

	<h3>Step 3: Download UnityModManager</h3>
	<section>
		<p>Select your game version below to download UnityModManager.</p>
		<blockquote class="blockquote lg:text-lg">
			Note: It's very important that you download and use the correct UnityModManager. Failure to do
			so will give you an error and result in your mods not working.
		</blockquote>
	</section>
	<UnityDownload />

	<!-- Step 4 -->

	<h3>Step 4: UnityModManager Setup</h3>
	<section>
		<p>
			After downloading, unzip the file, open the folder, and run <strong
				>UnityModManager.exe.</strong
			>
		</p>
		<p>Set the game path to:</p>
		<pre class="pre">C:\Program Files (x86)\Steam\steamapps\common\Skater XL</pre>
		Click&nbsp;<strong>"Install"</strong>&nbsp;or&nbsp;<strong>"Update"</strong>to complete the
		setup.
	</section>

	<!-- Step 5 -->

	<h3>Step 5: Download and Install Mods</h3>
	<section>
		<p>
			Download mods compatible with your game version and drop them into UnityModManager. Check our <a
				href="/mods">Mods</a
			> tab for a list of functional mods.
		</p>

		<blockquote class="blockquote lg:text-lg">
			Note: "Status: OK" or "Update to X.X.X" in UnityModManager means a mod is installed. Do not
			update mods within the manager, as it may cause compatibility issues. For manual changes,
			right-click the mod.
		</blockquote>
	</section>

	<!-- Step 6 -->

	<h3>Step 6: Launch Skater XL</h3>
	<section>
		<p>Start Skater XL!</p>
		<p>
			If everything went well, UnityModManager will show up upon launch and all of your mods will be
			listed. Status: green means the mod is working. Status: red means the mod is not working and
			will need to be updated/removed.
		</p>
	</section>
</section>

<!-- Video Guides -->
<section class="pb-8">
	{#each videos as video}
		<VideoItem {video} />
	{/each}
</section>
