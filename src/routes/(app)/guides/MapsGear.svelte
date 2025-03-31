<script lang="ts">
	import { Card } from '$lib/components';

	const mapGearData = [
		{ title: 'Custom Maps', content: 'Documents / SkaterXL / Maps' },
		{ title: 'Custom Gear', content: 'Documents / SkaterXL / Gear' },
		{ title: 'XLGM Gear (Textures)', content: 'Documents / SkaterXL / Gear' },
		{ title: 'XLGM Gear (Assets)', content: 'Documents / SkaterXL / XLGearModifier / AssetPacks' }
	];
</script>

<section>
	<h2>Maps & Gear</h2>
	<p>
		To install custom maps and gear, simply place them in the following directories. Make sure to
		extract the files from the ZIP folder!
	</p>
	<p>Please note that XLGM gear requires you to install each piece of gear into two folders.</p>
</section>

<section>
	<div class="flex flex-col gap-4">
		{#each mapGearData as { title, content }}
			<Card {title} {content} />
		{/each}
	</div>
</section>
