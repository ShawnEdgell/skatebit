<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { navItems } from '../constants/navItems'; // Assuming you move navItems to a constants file

	const drawerStore = getDrawerStore();

	// Function to close the drawer
	const closeDrawer = () => drawerStore.close();
</script>

<Drawer id="main-menu">
	<ul class="p-4 space-y-2">
		{#each navItems as { href, label }}
			<li>
				<a {href} class="btn font-semibold w-full variant-ghost" on:click={closeDrawer}>
					{label}
				</a>
			</li>
		{/each}
	</ul>
</Drawer>
