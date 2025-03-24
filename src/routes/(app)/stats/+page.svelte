<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
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

<Alert
	message="We are currently performing updates on this page, which has temporarily disabled our upload functionality. In the meantime, you may download files using the temporary links provided below. We appreciate your patience!"
/>

<section>
	<div class="mt-6 flex flex-col gap-4">
		{#each statsData as { title, content, download }}
			<Card {title} {content} {download} />
		{/each}
	</div>
</section>

<section>
	<h2>Essential Settings</h2>
	<p>
		For those who want to create their own stats or see which settings make Skater XL feel more
		realistic, this section will help you find the most important settings.
	</p>
	<p>
		Please note that these recommended values are just suggestions. You can adjust them to suit your
		personal preferences, as these are simply the most popular settings.
	</p>
	<h4>General</h4>
	<ul>
		<li>Gravity: -13</li>
		<li>Default Force: 3.25</li>
		<li>High Pop Mult: 0.40</li>
		<li>Baby Pop: ON</li>
		<li>In-Air Turn Speed: 1.30</li>
		<li>Max Angular Velocity: 9.00</li>
		<li>Pop Delay: OFF*</li>
		<li>Push Force: 6.00</li>
	</ul>
	<h4>Catch</h4>
	<ul>
		<li>Catch Mode: Realistic*</li>
		<li>Foot Catch Speed: 8.00</li>
	</ul>
	<h4>Flips</h4>
	<ul>
		<li>Flip Speed: 1.6</li>
		<li>Scoop Speed: 1.4</li>
		<li>Decoupled Board: Simple*</li>
	</ul>
	<h4>Grinds</h4>
	<ul>
		<li>Bump Out Pop Force: 1.00</li>
		<li>Bump Out Sideway Force: 1.00</li>
		<li>Max Angle: 22.00</li>
		<li>Pop Force: 1.00</li>
		<li>Stabalizer: OFF*</li>
		<li>Torque Force: 75.00</li>
	</ul>
	<h4>Manuals</h4>
	<ul>
		<li>Max Angle: 15.00</li>
		<li>Manual Delay: OFF*</li>
		<li>Pop Delay: OFF*</li>
		<li>Pop Force: 2.0</li>
	</ul>
	<h4>Misc</h4>
	<ul>
		<li>Wind Up Speed: 5.0</li>
	</ul>
</section>
