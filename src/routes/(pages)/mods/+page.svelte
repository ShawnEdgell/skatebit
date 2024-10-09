<script lang="ts">
	import { TabGroup, Tab, Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { mods } from './modsData'; // Ensure this path matches the location of your mods data file
	import UnityDownload from '../../../components/UnityDownload.svelte';

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
</header>

<section>
	<hr />
	<h2>UnityModManager</h2>
	<aside class="alert variant-filled-warning mb-4">
		<div class="flex items-center">
			<svg
				class="w-16 h-16 ml-2 mr-4"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g><g id="SVGRepo_iconCarrier">
					<circle cx="12" cy="17" r="1" fill="#000000"></circle>
					<path
						d="M12 10L12 14"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
					<path
						d="M3.44722 18.1056L10.2111 4.57771C10.9482 3.10361 13.0518 3.10362 13.7889 4.57771L20.5528 18.1056C21.2177 19.4354 20.2507 21 18.7639 21H5.23607C3.7493 21 2.78231 19.4354 3.44722 18.1056Z"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g></svg
			>
			<p class="text-base font-semibold my-0 lg:text-lg pr-2">
				Using the correct version of UnityModManager is crucial for successfully installing mods in
				Skater XL.
			</p>
		</div>
	</aside>
	<UnityDownload />
</section>

<section class="pb-8">
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
											<a
												href={url}
												class="mt-4 btn variant-filled-secondary no-underline"
												target="_blank"
												rel="noopener noreferrer">{label}</a
											>
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
</section>
