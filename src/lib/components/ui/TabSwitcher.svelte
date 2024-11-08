<script lang="ts">
	export let tabs: { id: string; label: string; component: any }[];
	let activeTab = tabs[0].id;
</script>

<div class="flex flex-col lg:grid sm:grid-cols-3 gap-2">
	{#each tabs as { id, label }}
		<button
			type="button"
			class="tab btn btn-primary w-full"
			class:btn-primary={activeTab === id}
			on:click={() => (activeTab = id)}
		>
			{label}
		</button>
	{/each}
</div>

{#each tabs as { id, label, component }}
	{#if activeTab === id}
		<h2>{label}</h2>
		<svelte:component this={component} />
	{/if}
{/each}
