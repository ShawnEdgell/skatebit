<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { navItems } from '../constants/navItems'; // Assuming you move navItems to a constants file

	const drawerStore = getDrawerStore();

	// Function to close the drawer
	const closeDrawer = () => drawerStore.close();
</script>

<Drawer id="main-menu">
	<!-- Add a hidden div with a focus index so it gets focused first -->
	<div data-focusindex="0" tabindex="-1" aria-hidden="true"></div>

	<ul class="p-4 space-y-2">
		{#each navItems as { href, label }, index}
			<li>
				<a
					{href}
					class="btn font-semibold w-full variant-ghost"
					on:click={closeDrawer}
					data-focusindex={index + 1}
				>
					{label}
				</a>
			</li>
		{/each}
	</ul>
</Drawer>
