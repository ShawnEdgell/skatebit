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
	<pre class="pre">Documents/SkaterXL/XLGearModifier/AssetPacks</pre>
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

	<section>
		<h3>Step 1: Check Your Game Version</h3>
		<p>
			Ensure you know your Skater XL version, as mod compatibility varies by version. Check the
			version at launch in the lower-left corner; v1.2.2.8 and v1.2.10.4 are the most common.
		</p>
	</section>

	<!-- Step 2 -->

	<section>
		<h3>Step 2: Changing Game Versions (Optional)</h3>
		<p>
			To switch versions, right-click <em>Skater XL</em> in Steam, select Properties &gt; Betas, then
			choose from the dropdown.
		</p>
	</section>

	<!-- Step 3 -->

	<section>
		<h3>Step 3: Download UnityModManager</h3>
		<p>
			Download the UnityModManager application to start installing mods. This tool is essential for
			managing and installing all Skater XL script mods. You will need to login to Nexus Mods in
			order to download the file.
		</p>
		<aside class="alert variant-filled-warning mb-4">
			<div class="flex items-center">
				<svg
					class="w-24 h-24 ml-2 mr-4"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<circle cx="12" cy="17" r="1" fill="#000000"></circle>
						<path
							d="M12 10L12 14"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</g></svg
				>
				<p class="text-base font-semibold my-0 lg:text-lg pr-2">
					The latest UnityModManger has been updated to work with any version of Skater XL. Make
					sure to select "Skater XL v1.2.2.8" as your game if you are playing on the Alpha branch.
				</p>
			</div>
		</aside>
		<a
			href="https://www.nexusmods.com/site/mods/21?tab=files"
			class="mt-4 btn mr-2 variant-filled-secondary no-underline"
			target="_blank">Nexus Mods Website</a
		>
	</section>

	<!-- Step 4 -->

	<section>
		<h3>Step 4: UnityModManager Setup</h3>
		<p>
			After downloading, unzip the file, open the folder, and run <strong
				>UnityModManager.exe.</strong
			>
		</p>
		<p>
			If you are playing on version 1.2.2.8 (Alpha), select 'Skater XL v1.2.2.8' as your game from
			the dropdown menu. If you are playing a different version, simply select 'Skater XL.'
		</p>
		<p>Set the game path to:</p>
		<pre class="pre">C:\ProgramFiles(x86)\Steam\steamapps\common\SkaterXL</pre>
		<p>
			Click&nbsp;<strong>"Install"</strong>&nbsp;or&nbsp;<strong>"Update"</strong>to complete the
			setup.
		</p>
	</section>

	<!-- Step 5 -->

	<section>
		<h3>Step 5: Download and Install Mods</h3>
		<p>
			Download mods compatible with your game version and drop them into UnityModManager. Check our <a
				href="/mods">Mods</a
			> tab for a list of functional mods.
		</p>
	</section>

	<!-- Step 6 -->

	<section>
		<h3>Step 6: Launch Skater XL</h3>
		<p>
			Start the game! If everything went well, UnityModManager will show up upon launch and all of
			your mods will be listed. Status: green means the mod is working. Status: red means the mod is
			not working and will need to be updated/removed.
		</p>
	</section>
</section>

<!-- Video Guides -->
<section class="pb-8">
	{#each videos as video}
		<VideoItem {video} />
	{/each}
</section>
