<script>
	let mods = [
		{ name: 'XXL Mod Stats', path: 'Documents/SkaterXL/XXLMod3/StatsCollections' },
		{ name: 'XXL Mod Stance', path: 'Documents/SkaterXL/XXLMod3/StanceCollections' },
		{ name: 'XXL Mod Steeze', path: 'Documents/SkaterXL/XXLMod3/SteezeCollections' },
		{ name: 'Fro Mod Settings', path: 'Steam/steamapps/common/SkaterXL/Mods/fro-mod' },
		{ name: 'Boned Ollie Mod Settings', path: 'Documents/SkaterXL/BonedOllieMod' }
	];
</script>

<div>
	<h2 class="h2">Installing Stats</h2>
	<p>
		After downloading stats, you will need to place them in the following directories to install:
	</p>
	<ul class="space-y-2 text-sm">
		{#each mods as mod}
			<li>
				{mod.name}:
				<code class="variant-soft-primary">{mod.path}</code>
			</li>
		{/each}
	</ul>
</div>
