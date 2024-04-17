<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import Mods from './Mods.svelte';
</script>

<svelte:head>
	<title>Skatebit | BMX Streets</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-surface mb-2">BMX Streets</span>
			<h1>Mods</h1>
			<p>Discover all the best mods for BMX Streets.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Mod List</h2>
			<p>
				Here you can find a list of all working script mods. Make sure your have Melon Loader
				downloaded and installed first, then simply drop these mods into your Mods folder.
			</p>
			<Mods />
		</div>
	</article>
</div>
