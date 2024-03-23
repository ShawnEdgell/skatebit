<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import QuickGuide from '$lib/components/QuickGuide.svelte';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div class="space-y-5" use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<QuickGuide />
</div>
