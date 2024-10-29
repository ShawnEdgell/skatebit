<script lang="ts">
	import { statSections } from './statsData';
</script>

<section>
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
