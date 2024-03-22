<script lang="ts">
	import { getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<div class="flex flex-col gap-3 p-6">
	<div class="flex items-center justify-between">
		<h2 class="h2">Mode</h2>
		<LightSwitch />
	</div>
	<div class="pt-2">
		<hr class="!border-t-2" />
	</div>
	<div class="flex flex-col gap-1">
		<h2 class="h2">Main</h2>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Home</a
		>
		<a
			href="/login"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Account</a
		>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Forum</a
		>
		<a
			href="/"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Blog</a
		>
	</div>
	<div class="flex flex-col gap-1">
		<h2 class="h2">Games</h2>
		<a
			href="/games/skaterxl"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Skater XL</a
		>
		<a
			href="/games/session"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Session</a
		>
		<a
			href="/games/skate"
			class="btn variant-filled"
			on:click={closeDrawer}
			data-sveltekit-preload-data="hover">Skate.</a
		>
	</div>
</div>
