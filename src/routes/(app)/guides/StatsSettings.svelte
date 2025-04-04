<script lang="ts">
	// No need for Card component anymore

	const statsData = [
		{ title: 'XXL 3 Mod Stats', content: 'Documents / SkaterXL / XXLMod3 / StatsCollections' },
		{ title: 'XXL 3 Mod Stance', content: 'Documents / SkaterXL / XXLMod3 / StanceCollections' },
		{ title: 'XXL 3 Mod Steeze', content: 'Documents / SkaterXL / XXLMod3 / SteezeCollections' },
		{ title: 'BonedOllieMod Settings', content: 'Documents / SkaterXL / BonedOllieMod' },
		{ title: "Fro's Mod Settings", content: 'Steam / steamapps / common / SkaterXL / fro-mod' }
	];
</script>

<section>
	<h2>Stats & Settings</h2>
	<p>
		Looking for new stats setups? Our <a href="/stats" class="hover:no-underline">Stats</a> page
		offers a solid set of preset configurations to help get you started. Keep in mind that most of
		the community shares their custom stats in various Discord servers. Visit our
		<a href="/links" class="hover:no-underline">Helpful Links</a> page for more on these communities!
	</p>
	<p class="mt-4">
		To install any of the following files, simply place the downloaded presets into the appropriate
		folder listed below.
	</p>
	<p>
		Note: For BonedOllieMod and Fro's Mod, you'll need to replace the existing settings files. These
		will be auto-loaded when Skater XL launches.
	</p>
</section>

<section class="not-prose mt-6">
	<div class="flex flex-col gap-4">
		<!-- XXL 3 Stats -->
		<div class="card bg-base-300">
			<div class="card-body">
				<h3 class="card-title text-xl">XXL 3 Mod Stats</h3>
				<p class="prose">Documents / SkaterXL / XXLMod3 / StatsCollections</p>
			</div>
		</div>

		<!-- XXL 3 Stance -->
		<div class="card bg-base-300">
			<div class="card-body">
				<h3 class="card-title text-xl">XXL 3 Mod Stance</h3>
				<p class="prose">Documents / SkaterXL / XXLMod3 / StanceCollections</p>
			</div>
		</div>

		<!-- XXL 3 Steeze -->
		<div class="card bg-base-300">
			<div class="card-body">
				<h3 class="card-title text-xl">XXL 3 Mod Steeze</h3>
				<p class="prose">Documents / SkaterXL / XXLMod3 / SteezeCollections</p>
			</div>
		</div>

		<!-- BonedOllieMod -->
		<div class="card bg-base-300">
			<div class="card-body">
				<h3 class="card-title text-xl">BonedOllieMod Settings</h3>
				<p class="prose">Documents / SkaterXL / BonedOllieMod</p>
			</div>
		</div>

		<!-- Fro's Mod -->
		<div class="card bg-base-300">
			<div class="card-body">
				<h3 class="card-title text-xl">Fro's Mod Settings</h3>
				<p class="prose">Steam / steamapps / common / SkaterXL / fro-mod</p>
			</div>
		</div>
	</div>
</section>
