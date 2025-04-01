<script lang="ts">
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
	<p>
		For help with installation, visit our <a href="/guides" class="hover:no-underline">Guides</a>
		section or ask us questions on
		<a class="hover:no-underline" href="https://discord.gg/G9aW5uV" target="_blank">Discord.</a>
	</p>
	<div class="divider"></div>
</section>

<!-- Downloads -->
<section>
	<h2>Downloads/Presets</h2>
	<!-- Basic Realistic Settings -->
	<h3>Basic Realistic Settings (Goofy and Regular)</h3>
	<p>
		A good starting point for building your own stats. Includes XXL Mod Presets and Fro's Mod
		settings.
	</p>
	<a
		href="https://damp-limit-8cd1.milky-irl.workers.dev/MilkyLatest.zip"
		class="btn btn-primary not-prose"
		target="_blank"
	>
		Download
	</a>
	<!-- Latest Settings -->
	<h3>Milky's Latest Stats (Regular)</h3>
	<p>
		14 Gravity. Latest stats as seen in recent streams and videos. Includes XXL Mod Presets and
		Fro's Mod settings.
	</p>
	<a
		href="https://damp-limit-8cd1.milky-irl.workers.dev/MilkyLatest.zip"
		class="btn btn-primary not-prose"
		target="_blank"
	>
		Download
	</a>
</section>

<!-- Essential Settings -->
<section>
	<h2>Essential Settings</h2>
	<p>
		For those who want to create their own stats or see which settings make Skater XL feel more
		realistic, this section will help you find the most important settings.
	</p>
	<p>
		Please note that these recommended values are just suggestions. You can adjust them to suit your
		personal preference.
	</p>

	<div class="overflow-x-auto">
		<table class="table">
			<tbody>
				<!-- General -->
				<tr><th>General</th><td>Gravity</td><td>-13</td></tr>
				<tr><td></td><td>Default Force</td><td>3.25</td></tr>
				<tr><td></td><td>High Pop Mult</td><td>0.40</td></tr>
				<tr><td></td><td>Baby Pop</td><td>ON</td></tr>
				<tr><td></td><td>In-Air Turn Speed</td><td>1.30</td></tr>
				<tr><td></td><td>Max Angular Velocity</td><td>9.00</td></tr>
				<tr><td></td><td>Pop Delay</td><td>OFF*</td></tr>
				<tr><td></td><td>Push Force</td><td>6.00</td></tr>

				<!-- Catch -->
				<tr><th>Catch</th><td>Catch Mode</td><td>Realistic*</td></tr>
				<tr><td></td><td>Foot Catch Speed</td><td>8.00</td></tr>

				<!-- Flips -->
				<tr><th>Flips</th><td>Flip Speed</td><td>1.6</td></tr>
				<tr><td></td><td>Scoop Speed</td><td>1.4</td></tr>
				<tr><td></td><td>Decoupled Board</td><td>Simple*</td></tr>

				<!-- Grinds -->
				<tr><th>Grinds</th><td>Bump Out Pop Force</td><td>1.00</td></tr>
				<tr><td></td><td>Bump Out Sideway Force</td><td>1.00</td></tr>
				<tr><td></td><td>Max Angle</td><td>22.00</td></tr>
				<tr><td></td><td>Pop Force</td><td>1.00</td></tr>
				<tr><td></td><td>Stabalizer</td><td>OFF*</td></tr>
				<tr><td></td><td>Torque Force</td><td>75.00</td></tr>

				<!-- Manuals -->
				<tr><th>Manuals</th><td>Max Angle</td><td>15.00</td></tr>
				<tr><td></td><td>Manual Delay</td><td>OFF*</td></tr>
				<tr><td></td><td>Pop Delay</td><td>OFF*</td></tr>
				<tr><td></td><td>Pop Force</td><td>2.0</td></tr>

				<!-- Misc -->
				<tr><th>Misc</th><td>Wind Up Speed</td><td>5.0</td></tr>
			</tbody>
		</table>
	</div>
</section>
