<script lang="ts">
	import { getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<div class="flex flex-col items gap-2 p-6">
	<h1 class="text-xl">General</h1>
	<a href="/" on:click={closeDrawer} class="btn" data-sveltekit-preload-data="hover">Homepage</a>
	<a href="/login" on:click={closeDrawer} class="btn" data-sveltekit-preload-data="hover">Account</a
	>
	<a
		href="/docs/introduction"
		on:click={closeDrawer}
		class="btn"
		data-sveltekit-preload-data="hover">Documentation</a
	>
	<a href="/forums" on:click={closeDrawer} class="btn" data-sveltekit-preload-data="hover">Forums</a
	>
	<a href="/blog" on:click={closeDrawer} class="btn" data-sveltekit-preload-data="hover">Blog</a>
	<hr class="!border-t-2 my-2" />
	<h1 class="text-xl">Games</h1>
	<a href="/skaterxl/news" on:click={closeDrawer} class="btn" data-sveltekit-preload-data="hover"
		>Skater XL</a
	>
	<a href="/session/news" on:click={closeDrawer} class="btn" data-sveltekit-preload-data="hover"
		>Session</a
	>
	<a href="/skate/news" on:click={closeDrawer} class="btn" data-sveltekit-preload-data="hover"
		>Skate.</a
	>
	<hr class="!border-t-2 my-2" />
	<div class="flex items-center justify-between">
		<h1 class="text-xl">Mode</h1>
		<LightSwitch />
	</div>
</div>
