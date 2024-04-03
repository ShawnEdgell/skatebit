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
				We've created a comprehensive platform where players can come together to exchange tips,
				find guides, download community stats and settings, and engage in discussions.
			</p>
		</div>
		<div>
			<h2>Games</h2>
			<p>Check out our collection of supported games.</p>
			<Cards />
		</div>
	</article>
</div>
