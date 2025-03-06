<script lang="ts">
	import Help from '$lib/components/Help.svelte';
	import Card from '$lib/components/Card.svelte';

	const statsData = [
		{
			title: 'Basic Realistic Settings (Goofy and Regular)',
			content:
				"A good starting point for building your own stats. Includes XXL Mod Presets and Fro's Mod settings.",
			download: 'https://damp-limit-8cd1.milky-irl.workers.dev/MilkyLatest.zip'
		},
		{
			title: "Milky's Latest Stats (Regular)",
			content:
				"14 Gravity. Latest stats as seen in recent streams and videos. Includes XXL Mod Presets and Fro's Mod settings.",
			download: 'https://damp-limit-8cd1.milky-irl.workers.dev/MilkyLatest.zip'
		}
	];

	const pageTitle = 'Stats & Settings';
	const pageDescription = 'Download presets for your Skater XL mods.';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<Help />
	<div class="divider"></div>
</section>

<!-- Alert Message -->
<section>
	<div role="alert" class="alert alert-info mt-6">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-current"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<span>
			We’re currently moving stuff around on our backend, which has temporarily affected some upload
			and download features. You can still download files using our temporary links below. Thank you
			for your patience and understanding!
		</span>
	</div>
</section>

<section>
	<div class="mt-6 flex flex-col gap-4">
		{#each statsData as { title, content, download }}
			<Card {title} {content} {download} />
		{/each}
	</div>
</section>
