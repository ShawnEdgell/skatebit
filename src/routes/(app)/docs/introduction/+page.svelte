<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import Cards from './Cards.svelte';
</script>

<svelte:head>
	<title>Skatebit | Introduction</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled mb-2">Docs</span>
			<h1>Introduction</h1>
			<p>Welcome to Skatebit!</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>About Skatebit.</h2>

			<p>
				Skatebit is your ultimate destination for all things related to skateboarding video games.
			</p>
			<p>
				We've created a comprehensive platform where skateboarding enthusiasts can come together to
				exchange tips, find guides, download community stats and settings, and engage in
				discussions.
			</p>
		</div>
		<Cards />
	</article>
</div>
