<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div class="space-y-5" use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<h1 class="text-3xl font-bold mb-8">XL Hub</h1>
	<h2 class="text-xl font-semibold mb-2">The Easy Way to Mod Skater XL</h2>
	<p class="mb-4">
		Introducing XL Hub by Fro, the ultimate tool for browsing, downloading, and managing your Skater
		XL maps and mods. No UnityModManager required.
	</p>
	<a href="https://mod.io/g/skaterxl/m/xlhub" target="_blank" class="btn variant-filled-secondary"
		>Check Out XL Hub</a
	>
</div>
