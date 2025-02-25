<script lang="ts">
	import Help from '$lib/components/Help.svelte';

	const pageTitle = 'Stats & Settings';
	const pageDescription = 'Download presets for your Skater XL mods.';
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<h1>{pageTitle}</h1>
<Help />
<div class="divider"></div>

<section>
	<div class="card bg-info-content text-primary-content">
		<div class="card-body">
			<h2 class="card-title not-prose">Note:</h2>
			<div>
				We’re currently experiencing high usage on our backend, which has temporarily limited some
				upload and download features. You can still download files using our temporary links below.
				Thank you for your patience and understanding!
			</div>
		</div>
	</div>
</section>

<section>
	<h3>Basic Realistic Settings (Goofy and Regular)</h3>
	<p>A good starting point for building your own stats.</p>

	<a
		class="btn btn-soft not-prose"
		href="https://damp-limit-8cd1.milky-irl.workers.dev/BasicRealisticSettings.zip"
		download>Download</a
	>
</section>

<section>
	<h3>Milky's Latest Stats (Regular)</h3>
	<p>14 Gravity. Latest stats as seen in recent streams and videos.</p>

	<a
		class="btn btn-soft not-prose"
		href="https://damp-limit-8cd1.milky-irl.workers.dev/MilkyLatest.zip"
		download>Download</a
	>
</section>
