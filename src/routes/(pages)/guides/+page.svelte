<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
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
	<hr />
</section>

<!-- Getting Started Section -->
<section>
	<h2>Getting Started with Skater XL Modding</h2>
	<p>
		This guide will walk you through the essential steps to get you up and running with all the
		latest mods.
	</p>

	<!-- Step 1 -->
	<h3>Step 1: Check Your Game Version</h3>
	<p>
		Ensure you know your Skater XL version, as mod compatibility varies by version. Check the
		version at launch in the lower-left corner; <strong>v1.2.2.8</strong> and
		<strong>v1.2.7.8</strong> are the most common.
	</p>

	<!-- Step 2 -->
	<h3>Step 2: Changing Game Versions (Optional)</h3>
	<p>
		To switch versions, right-click <em>Skater XL</em> in Steam, select
		<strong>Properties &gt; Betas</strong>, then choose from the dropdown.
	</p>

	<!-- Step 3 -->
	<h3>Step 3: Download UnityModManager</h3>
	<p>
		Select your game version below to download UnityModManager (UMM). It's very important that you
		download and use the correct one.
	</p>

	<Accordion autocollapse>
		<AccordionItem>
			<svelte:fragment slot="lead"></svelte:fragment>
			<svelte:fragment slot="summary"><strong>Skater XL v1.2.2.8 (Alpha)</strong></svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Alpha/UnityModManager-21-0-27-4-1690201835.zip"
				>
					Download UnityModManager v0.27.4
				</a></svelte:fragment
			>
		</AccordionItem>
		<AccordionItem>
			<svelte:fragment slot="lead"></svelte:fragment>
			<svelte:fragment slot="summary"><strong>Skater XL v1.2.7.8 (Public)</strong></svelte:fragment>
			<svelte:fragment slot="content">
				<a
					href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Public/UnityModManager-21-0-27-7-1694510711.zip"
				>
					Download UnityModManager v0.27.7
				</a></svelte:fragment
			>
		</AccordionItem>
	</Accordion>

	<div></div>

	<!-- Step 4 -->
	<h3>Step 4: UnityModManager Setup</h3>
	<p>
		After downloading, unzip the file, open the folder, and run UnityModManager.exe. Set the game
		path to:
	</p>
	<p></p>
	<p>C:\Program Files (x86)\Steam\steamapps\common\Skater XL</p>

	<p>Click "Install or Update" to complete the setup.</p>

	<!-- Step 5 -->
	<h3>Step 5: Download and Install Mods</h3>
	<p>
		Download mods compatible with your game version and drop them into UnityModManager. Check our <a
			href="/mods">Mods</a
		> tab for a list of functional mods.
	</p>
	<blockquote class="blockquote lg:text-lg">
		<p>
			<strong>Note:</strong> "Status: OK" or "Update to X.X.X" in UnityModManager means a mod is installed.
			Do not update mods within the manager, as it may cause compatibility issues. For manual changes,
			right-click the mod.
		</p>
	</blockquote>

	<!-- Step 6 -->
	<h3>Step 6: Launch Skater XL</h3>
	<p>
		Start Skater XL. UnityModManager will show each mod's status: green for functioning and red for
		problems.
	</p>
</section>

<hr />

<!-- Video Guides -->

<h2>2024 Mod Guide</h2>
<iframe
	src="https://www.youtube.com/embed/veZlQE7tfHw?si=IvYW0f4Fgs5Wt65A"
	frameborder="0"
	allowfullscreen
	class="w-full h-96"
	title="2021 Skater XL Modding Guide"
	loading="lazy"
></iframe>
