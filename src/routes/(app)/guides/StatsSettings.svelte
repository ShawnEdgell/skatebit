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
		Looking for new stats setups? You can download stat and mod setting presets from our <a
			href="/stats"
			class="hover:no-underline">Stats</a
		> page as well as various modding Discord servers where the community shares their own custom configurations.
	</p>
	<p class="mt-4">
		We’re also working on a feature that will let users upload and share their own presets right
		here, so stay tuned!
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
		<div class="card bg-base-300 shadow-sm">
			<div class="card-body">
				<h3 class="card-title text-xl">XXL 3 Mod Stats</h3>
				<p class="prose">Documents / SkaterXL / XXLMod3 / StatsCollections</p>
			</div>
		</div>

		<!-- XXL 3 Stance -->
		<div class="card bg-base-300 shadow-sm">
			<div class="card-body">
				<h3 class="card-title text-xl">XXL 3 Mod Stance</h3>
				<p class="prose">Documents / SkaterXL / XXLMod3 / StanceCollections</p>
			</div>
		</div>

		<!-- XXL 3 Steeze -->
		<div class="card bg-base-300 shadow-sm">
			<div class="card-body">
				<h3 class="card-title text-xl">XXL 3 Mod Steeze</h3>
				<p class="prose">Documents / SkaterXL / XXLMod3 / SteezeCollections</p>
			</div>
		</div>

		<!-- BonedOllieMod -->
		<div class="card bg-base-300 shadow-sm">
			<div class="card-body">
				<h3 class="card-title text-xl">BonedOllieMod Settings</h3>
				<p class="prose">Documents / SkaterXL / BonedOllieMod</p>
			</div>
		</div>

		<!-- Fro's Mod -->
		<div class="card bg-base-300 shadow-sm">
			<div class="card-body">
				<h3 class="card-title text-xl">Fro's Mod Settings</h3>
				<p class="prose">Steam / steamapps / common / SkaterXL / fro-mod</p>
			</div>
		</div>
	</div>
</section>
