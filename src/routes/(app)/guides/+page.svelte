<script lang="ts">
	import GettingStarted from './GettingStarted.svelte';
	import MapsGear from './MapsGear.svelte';
	import StatsSettings from './StatsSettings.svelte';
</script>

<svelte:head>
	<title>Skatebit | Guides</title>
	<meta
		name="description"
		content="These guides will walk you through the essential steps to get you up and running with all the
	latest mods."
	/>
</svelte:head>

<h1>Guides</h1>
<p>
	These guides will walk you through the essential steps to get you up and running with all the
	latest mods.
</p>
<div class="divider"></div>

<!-- Tabs -->
<div class="flex min-w-full flex-col justify-center">
	<!-- Getting Started -->
	<input
		type="radio"
		name="guide_tabs"
		class="tab btn mt-6 w-full"
		aria-label="Gettings Started"
		checked="checked"
	/>
	<div class="tab-content">
		<GettingStarted />
	</div>
	<!-- Maps & Gear -->
	<input type="radio" name="guide_tabs" class="tab btn w-full" aria-label="Maps & Gear" />
	<div class="tab-content">
		<MapsGear />
	</div>
	<!-- Stats & Settings -->
	<input type="radio" name="guide_tabs" class="tab btn w-full" aria-label="Stats & Settings" />
	<div class="tab-content">
		<StatsSettings />
	</div>
</div>
