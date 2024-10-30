<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let tabLinks: { name: string; label: string }[] = [];
	export let tabSet: number = 0;
	export let columns: string = 'grid-cols-1'; // Default column class

	const dispatch = createEventDispatcher();

	// Set the active tab based on the URL hash
	const setTabFromHash = () => {
		const hash = window.location.hash.replace('#', '');
		const index = tabLinks.findIndex((tab) => tab.name === hash);
		if (index !== -1) {
			tabSet = index;
			dispatch('tabChange', index); // Notify parent about tab change
		}
	};

	// Listen to hash changes and update the active tab accordingly
	onMount(() => {
		setTabFromHash();
		window.addEventListener('hashchange', setTabFromHash);
		return () => window.removeEventListener('hashchange', setTabFromHash);
	});

	// Function to update the URL hash when a tab is clicked
	const updateHash = (index: number) => {
		window.location.hash = tabLinks[index].name;
		tabSet = index;
		dispatch('tabChange', index); // Notify parent about tab change
	};
</script>

<div class={`logo-cloud ${columns} gap-1`}>
	{#each tabLinks as { name, label }, index}
		<button
			class="btn py-4 rounded-none logo-item no-underline"
			on:click={() => updateHash(index)}
			class:selected={tabSet === index}
		>
			<span>{label}</span>
		</button>
	{/each}
</div>
