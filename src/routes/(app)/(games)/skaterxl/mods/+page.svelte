<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import ModTabs from './ModTabs.svelte';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
			<h1>Mods</h1>
			<p>Discover all the best mods for Skater XL.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Mod List</h2>
			<p>
				Please select your game version below to view a curated list of compatible modifications.
			</p>
			<ModTabs />
		</div>
	</article>
</div>
