<script lang="ts">
	const fileUrlFishy =
		'https://firebasestorage.googleapis.com/v0/b/skatebit-65c51.appspot.com/o/Milky_FishyStats.zip?alt=media&token=ad841464-de0f-40b6-b96a-a3f945babd30';
	const fileUrlSharky =
		'https://firebasestorage.googleapis.com/v0/b/skatebit-65c51.appspot.com/o/Milky_SharkyStats.zip?alt=media&token=9cacaca1-33a8-4ec6-9e39-0da113675b25';
	const fileUrlFroggy =
		'https://firebasestorage.googleapis.com/v0/b/skatebit-65c51.appspot.com/o/Milky_FroggyStats.zip?alt=media&token=66ead963-4e6c-4ba9-87d9-c5dc60c8b621';
</script>

<svelte:head>
	<title>Skatebit | Stats & Settings</title>
</svelte:head>

<header>
	<span class="badge variant-filled-primary mb-2">Skater XL</span>
	<h1>Stats & Settings</h1>
</header>

<section>
	<hr />
	<h2>Downloads</h2>
	<h3>Milky's 'Fishy' Stats (Latest)</h3>
	<p>
		14 Gravity. These are the latest stats I've been using. Includes a mixture of old settings with
		new stuff mixed in, a bunch of new steeze settings for high pops.
	</p>
	<a href={fileUrlFishy} class="btn variant-filled-secondary no-underline" download
		>Download Fishy Stats</a
	>
</section>

<section>
	<h3>Milky's 'Sharky' Stats</h3>
	<p>
		13 gravity. Automatic steeze set up for most tricks. Custom catch and stances for pretty much
		everything.
	</p>
	<a href={fileUrlSharky} class="btn variant-filled-secondary no-underline" download
		>Download Sharky Stats</a
	>
</section>

<section>
	<h3>Milky's 'Froggy' Stats</h3>
	<p>
		15 Gravity. These stats have a bunch of 'automatic steeze' settings set up with the XXL3 Mod. To
		make these work properly Fro's Realistic Catch has been turned off.
	</p>
	<a href={fileUrlFroggy} class="btn variant-filled-secondary no-underline" download
		>Download Froggy Stats</a
	>
</section>

<section class="pb-8">
	<hr />
	<h2>How to Install</h2>
	<p>
		Extract the .zip folder to find each of these stat files, and place them in the following
		directories:
	</p>
	<blockquote class="blockquote lg:text-lg">
		Note: For the BonedOllieMod and Fro's Mod settings, you'll need to replace the existing settings
		files with the new ones you want to install.
	</blockquote>
	<h3>XXL 3 Mod Stats:</h3>
	<pre class="pre">Documents/SkaterXL/XXLMod3/StatsCollections</pre>
	<h3>XXL 3 Mod Stance:</h3>
	<pre class="pre">Documents/SkaterXL/XXLMod3/StanceCollections</pre>
	<h3>XXL 3 Mod Steeze:</h3>
	<pre class="pre">Documents/SkaterXL/XXLMod3/SteezeCollections</pre>
	<h3>BonedOllieModSettings:</h3>
	<pre class="pre">Documents/SkaterXL/BonedOllieMod</pre>
	<h3>Fro's Mod Settings:</h3>
	<pre class="pre">Steam/steamapps/common/SkaterXL/fro-mod</pre>
</section>
