<script lang="ts">
	import Divider from '$lib/components/layout/Divider.svelte';
	import dnd from '$lib/images/dnd.webp';
	import folders from '$lib/images/folders.webp';
	import maps from '$lib/images/maps.webp';
	import stats from '$lib/images/stats.webp';
	import themes from '$lib/images/themes.webp';

	const pageTitle = 'XL File Manager';
	const pageDescription =
		'XLFM is a lightweight desktop app that makes it easy for Skater XL players to manage and install maps and files with drag-and-drop, one-click updates, and built-in zip support.';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>
		{pageDescription}
	</p>
	<Divider />
</section>

<section>
	<h2>Features</h2>
	<ul>
		<li>Auto-download and install maps from Mod.io</li>
		<li>Easily download and share custom stats and settings</li>
		<li>Drag-and-drop any file with built-in ZIP extraction</li>
		<li>Organize extracted files into subfolders automatically</li>
		<li>Search function for both Mod.io and local maps</li>
		<li>Browse and manage your Skater XL folder using tabs</li>
		<li>One-time install with seamless auto-updates</li>
		<li>Easily change and save your map folder location</li>
		<li>Auto-create any missing mod folders</li>
		<li>Switch between customizable themes</li>
	</ul>
</section>

<section>
	<h2>Download</h2>
	<p>
		To install, simply download and run the installer. You will only need to install this once! All
		future updates will happen directly within the app.
	</p>
	<a
		href="https://github.com/ShawnEdgell/skatebit-app/releases/download/v1.2.0/XLFM_1.2.0_x64-setup.exe"
		class="btn btn-primary"
		target="_blank">Download XLFM</a
	>
	<a
		href="https://github.com/ShawnEdgell/skatebit-app/releases"
		class="btn btn-soft"
		target="_blank">Source Code (Github)</a
	>
</section>

<section>
	<h2>Screenshots</h2>
	<!-- display images full-width in a single column -->

	<img src={folders} alt="Automatic folder creation" class="w-full" />
	<img src={maps} alt="Map installation interface" class="w-full" />
	<img src={stats} alt="Custom stats & settings" class="w-full" />
	<img src={dnd} alt="Drag-and-drop demo" class="w-full" />
	<img src={themes} alt="Customizable themes" class="w-full" />
</section>
