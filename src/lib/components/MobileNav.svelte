<script lang="ts">
	import { getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}

	const navigationLinks = [
		{ url: '/', label: 'Home' },
		{ url: '/forums', label: 'Forums' },
		{ url: '/docs/introduction', label: 'Documentation' },
		{ url: '/docs/news', label: 'News' },
		{ url: '/skaterxl/news', label: 'Skater XL News' },
		{ url: '/skaterxl/guides', label: 'Skater XL Guides' },
		{ url: '/skaterxl/mods', label: 'Skater XL Mods' },
		{ url: '/skaterxl/stats', label: 'Skater XL Stats' },
		{ url: '/skaterxl/xlhub', label: 'Skater XL Hub' },
		{ url: '/session/news', label: 'Session News' },
		{ url: '/session/stats', label: 'Session Stats' },
		{ url: '/skate/news', label: 'Skate News' }
	];
</script>

<nav>
	<!-- (optionally you can provide a label here) -->
	<ul>
		<li class="list flex flex-col p-6 space-y-2">
			{#each navigationLinks as { url, label }}
				<a href={url} on:click={closeDrawer}>
					<span class="btn variant-soft w-full">{label}</span>
				</a>
			{/each}
		</li>
		<!-- ... -->
	</ul>
</nav>
<div class="card flex justify-between p-6 mx-6">
	<strong>Mode:</strong>
	<LightSwitch />
</div>
