<script lang="ts">
	import Help from '$lib/components/Help.svelte';

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
	<div role="alert" class="alert alert-info">
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

<!-- Basic Realistic Settings -->
<section>
	<h3>Basic Realistic Settings (Goofy and Regular)</h3>
	<p>A good starting point for building your own stats.</p>

	<a
		class="btn btn-soft not-prose"
		href="https://damp-limit-8cd1.milky-irl.workers.dev/BasicRealisticSettings.zip"
		download>Download</a
	>
</section>

<!-- Milky's Latest Settings -->
<section>
	<h3>Milky's Latest Stats (Regular)</h3>
	<p>14 Gravity. Latest stats as seen in recent streams and videos.</p>

	<a
		class="btn btn-soft not-prose"
		href="https://damp-limit-8cd1.milky-irl.workers.dev/MilkyLatest.zip"
		download>Download</a
	>
</section>
