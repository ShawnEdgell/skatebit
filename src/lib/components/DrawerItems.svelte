<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<div class="flex flex-col gap-5 p-8">
	<a href="/" class="btn variant-filled" on:click={closeDrawer} data-sveltekit-preload-data="hover"
		>Home</a
	>
	<a
		href="/login"
		class="btn variant-filled"
		on:click={closeDrawer}
		data-sveltekit-preload-data="hover">Account</a
	>
</div>
