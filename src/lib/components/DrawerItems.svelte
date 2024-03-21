<script lang="ts">
	import { getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<div class="flex flex-col p-6 space-y-3">
	<div class="flex flex-col p-6 space-y-3">
		<h2 class="h2">Main</h2>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Home</a
		>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Account</a
		>
		<h2 class="h2">Games</h2>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Skater XL</a
		>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Session</a
		>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Skate.</a
		>
	</div>
	<div class="card flex justify-between items-center p-6">
		<h2 class="h2">Mode</h2>
		<LightSwitch />
	</div>
</div>
