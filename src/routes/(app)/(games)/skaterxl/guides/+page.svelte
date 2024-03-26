<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import QuickGuide from './QuickGuide.svelte';
	import MapsGear from './MapsGear.svelte';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<span class="badge variant-filled mb-2">Skater XL</span>
	<h1 class="text-3xl font-bold mb-8">Guides</h1>
	<div>
		<h2 class="text-xl font-semibold mb-2">Getting Started with Skater XL Modding</h2>
		<p class="mb-4">
			Begin your Skater XL modding journey with our getting started guide. This guide will walk you
			through the essential steps to get you up and running with all the latest mods.
		</p>
		<div class="card p-6 mb-12">
			<QuickGuide />
		</div>
	</div>
	<hr class="!border-t-2 my-12" />
	<div>
		<h2 class="text-xl font-semibold mb-2">Maps & Gear</h2>
		<p class="mb-4">
			Begin your Skater XL modding journey with our getting started guide. This guide will walk you
			through the essential steps to get you up and running with all the latest mods.
		</p>
		<div class="card p-6 mb-12">
			<MapsGear />
		</div>
	</div>
</div>
