<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import ModTabs from './ModTabs.svelte';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div class="space-y-5" use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<h1 class="text-3xl font-bold mb-8">Mods</h1>
	<h2 class="text-xl font-semibold mb-2">Choosing Your Game Version</h2>
	<p class="mb-4">
		Different versions of Skater XL come with their own set of unique mods. Find out below what's
		special about each one.
	</p>

	<div class="flex gap-4">
		<div class="card p-0 mt-4 mb-4">
			<img src="/images/Alpha2.webp" alt="Skater XL Alpha Version" class="rounded-lg" />
			<p class="p-4">
				<strong>Skater XL v1.2.2.8 (Alpha)</strong>
				<br />
				<span class="text-sm">
					Unparalleled mod support in Skater XL 1.2.2.8 empowers players to explore a vast modding
					universe, featuring essential mods like the XXL 3 mod and XL Gear Modifier.
				</span>
			</p>
		</div>
		<div class="card p-0 mt-4 mb-4">
			<img src="/images/Home2.webp" alt="Skater XL Public Version" class="rounded-lg" />
			<p class="p-4">
				<strong>Skater XL v1.2.7.8 (Public)</strong>
				<br />
				<span class="text-sm">
					Vert skating gets a revolutionary makeover in v1.2.7.8 with an advanced grabs update. It's
					a dream come true for ramp and bowl lovers seeking depth and realism in their
					skateboarding exploits.
				</span>
			</p>
		</div>
	</div>
	<h2 class="text-xl font-semibold mb-2">Working Mods</h2>
	<p class="mb-4">
		Please select your game version below to view a curated list of compatible modifications.
	</p>
</div>
<ModTabs />
