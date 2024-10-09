<script lang="ts">
	import { TabGroup, Tab, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { mods } from './modsData'; // Ensure this path matches the location of your mods data file

	let tabSet: number = 0;

	function getBadgeClass(badgeName: string): string {
		switch (badgeName) {
			case 'Essential':
				return 'badge variant-filled';
			case 'New':
				return 'badge variant-filled-success';
			case 'Recommended':
				return 'badge variant-filled-secondary';
			case 'Useful':
				return 'badge variant-filled-primary';
			case 'Fun':
				return 'badge variant-filled-warning';
			// Add more cases as needed
			default:
				return 'badge';
		}
	}
</script>

<svelte:head>
	<title>Skatebit | Mods</title>
</svelte:head>

<header>
	<span class="badge variant-filled-primary mb-2">Skater XL</span>
	<h1>Mods</h1>
	<p>
		For help with installation, visit our <a href="/guides" data-sveltekit-preload-data="hover"
			>Guides</a
		>
		section or ask us questions on
		<a href="https://discord.gg/hPAstnVJq3" target="_blank">Discord.</a>
	</p>
	<hr />
</header>

<h2>UnityModManager</h2>
<aside class="alert variant-filled-warning mb-4">
	<p class="font-bold m-0">
		Using the correct version of UnityModManager is crucial for successfully installing mods in
		Skater XL.
	</p>
</aside>
<Accordion>
	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><strong>Skater XL v1.2.2.8 (Alpha)</strong></svelte:fragment>
		<svelte:fragment slot="content">
			<a
				href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Alpha/UnityModManager-21-0-27-4-1690201835.zip"
			>
				Download UnityModManager v0.27.4
			</a></svelte:fragment
		>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead"></svelte:fragment>
		<svelte:fragment slot="summary"><strong>Skater XL v1.2.7.8 (Public)</strong></svelte:fragment>
		<svelte:fragment slot="content">
			<a
				href="https://jvfiwbxwwjhhbfonzgbc.supabase.co/storage/v1/object/public/UnityModManager/Public/UnityModManager-21-0-27-7-1694510711.zip"
			>
				Download UnityModManager v0.27.7
			</a></svelte:fragment
		>
	</AccordionItem>
</Accordion>
<hr />
<h2>Working Mod List</h2>
<p>Select your game version below to browse a curated list of compatible mods.</p>
<TabGroup>
	{#each mods as { tab, version }, tabIndex}
		<Tab bind:group={tabSet} name={`tab${tabIndex}`} value={tabIndex}>
			<svelte:fragment slot="lead">
				<strong>{tab}</strong>
			</svelte:fragment>
			<span>{version}</span>
		</Tab>
	{/each}

	<svelte:fragment slot="panel">
		{#if tabSet < mods.length}
			<Accordion>
				{#each mods[tabSet].modItems as { title, author, workingVersion, keybind, features, note, badge, downloadLinks }}
					<AccordionItem>
						<svelte:fragment slot="lead">
							{#if badge}
								<!-- Use the getBadgeClass function to determine the class -->

								<div class={getBadgeClass(badge)}>{badge}</div>
							{/if}
						</svelte:fragment>
						<svelte:fragment slot="summary">{title}</svelte:fragment>
						<svelte:fragment slot="content">
							<div class="card p-4">
								<div class="font-bold text-lg lg:text-2xl mb-4">{title}</div>
								<div><strong>Author:</strong> <span>{author}</span></div>
								<div>
									<strong>Working Version:</strong>
									<span>{workingVersion}</span>
								</div>
								<div><strong>Keybind:</strong> <span>{keybind}</span></div>
								<div>
									<strong>Features:</strong>
									<span>
										{#each features as feature, i}
											{feature}{#if i < features.length - 1},&nbsp;
											{/if}
										{/each}
									</span>
								</div>

								{#if note}
									<div>
										<strong>Note:</strong> <span>{note}</span>
									</div>
								{/if}
								<div class="flex items-start">
									{#each downloadLinks as { url, label }}
										<strong>Link:&nbsp;</strong>
										<a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
									{/each}
								</div>
							</div>
						</svelte:fragment>
					</AccordionItem>
				{/each}
			</Accordion>
		{/if}
	</svelte:fragment>
</TabGroup>
