<script lang="ts">
	import InstallHelp from '../../../components/InstallHelp.svelte';
	import Badge from '../../../components/Badge.svelte';
	import ModPackSection from './components/ModPackSection.svelte';
	import WorkingModListSection from './components/WorkingModListSection.svelte';
	import SoundPackSection from './components/SoundPackSection.svelte';

	let tabSet: number = 0;
</script>

<svelte:head>
	<title>Skatebit | Mods</title>
	<meta
		name="description"
		content="Everything you need to start modding Skater XL mods, including UnityModManager, XL Hub, mod packs, and working mod lists."
	/>
</svelte:head>

<header>
	<Badge />
	<h1>Mods</h1>
	<InstallHelp />
	<hr />
</header>

<div class="logo-cloud grid-cols-1 sm:!grid-cols-3 gap-1">
	<button
		class="btn py-4 rounded-none logo-item no-underline"
		on:click={() => (tabSet = 0)}
		class:selected={tabSet === 0}
	>
		<span>Working Mod List</span>
	</button>
	<button
		class="btn py-4 rounded-none logo-item no-underline"
		on:click={() => (tabSet = 1)}
		class:selected={tabSet === 1}
	>
		<span>Mod Packs</span>
	</button>
	<button
		class="btn py-4 rounded-none logo-item no-underline"
		on:click={() => (tabSet = 2)}
		class:selected={tabSet === 2}
	>
		<span>Sound Packs</span>
	</button>
</div>

{#if tabSet === 0}
	<section>
		<WorkingModListSection />
	</section>
{:else if tabSet === 1}
	<section>
		<ModPackSection />
	</section>
{:else if tabSet === 2}
	<section>
		<SoundPackSection />
	</section>
{/if}
