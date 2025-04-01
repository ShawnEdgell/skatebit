<script lang="ts">
	const links = [
		{ label: 'skaterxl.mod.io', href: 'https://mod.io/g/skaterxl' },
		{ label: 'XL Hub by Fro', href: 'https://mod.io/g/skaterxl/m/xlhub' },
		{ label: 'Unity Mod Manager', href: 'https://www.nexusmods.com/site/mods/21?tab=files' },
		{ label: 'Skater XL Discord', href: 'https://discord.gg/uDkSEBKdga' },
		{ label: 'Unity 2019.4 LTS', href: 'https://unity.com/releases/editor/whats-new/2019.4.40' }
	];
</script>

<div class="card bg-base-200">
	<div class="card-body space-y-4">
		<h2 class="card-title text-base font-bold">🔗 Quick Links</h2>
		<ul class="flex flex-col gap-2">
			{#each links as { label, href }}
				<li>
					<a
						{href}
						target="_blank"
						class="btn btn-sm btn-outline btn-primary w-full justify-start text-left"
					>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
