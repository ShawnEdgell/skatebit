<script lang="ts">
	import { statSections } from './statsData';
</script>

<svelte:head>
	<title>Skatebit | Stats & Settings</title>
	<meta name="description" content="Get the latest stats from Milky and the community." />
</svelte:head>

<header>
	<span class="badge variant-filled-primary mb-2">Skater XL</span>
	<h1>Stats & Settings</h1>
</header>

<section>
	<hr />
	<h2>Downloads</h2>
	{#each statSections as section}
		<h3>{section.title}</h3>
		<p>
			{section.description}
		</p>
		<a href={section.downloadLink} class="btn variant-filled-secondary no-underline" download
			>Download</a
		>
		{#if section.discordLink}
			<a href={section.discordLink} class="btn variant-ghost-secondary no-underline" target="_blank"
				>Discord</a
			>
		{/if}
	{/each}
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
