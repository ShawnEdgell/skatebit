<script lang="ts">
	import { AppRail, AppRailAnchor, getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	interface NavLink {
		title: string;
		url: string;
	}

	interface NavLinksMapping {
		[key: string]: NavLink[];
	}

	const navLinksMapping: NavLinksMapping = {
		'/docs': [
			{ title: 'Introduction', url: '/docs/introduction' },
			{ title: 'News', url: '/docs/news' }
			// Add more links as needed
		],
		'/skaterxl': [
			{ title: 'News', url: '/skaterxl/news' },
			{ title: 'Guides', url: '/skaterxl/guides' },
			{ title: 'Mods', url: '/skaterxl/mods' },
			{ title: 'Stats & Settings', url: '/skaterxl/stats' },
			{ title: 'XL Hub', url: '/skaterxl/xlhub' }
		],
		'/session': [
			{ title: 'News', url: '/session/news' },
			{ title: 'Stats & Settings', url: '/session/stats' }
		],
		'/skate': [{ title: 'News', url: '/skate/news' }]
	};

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}

	// Dynamically compute classes for active state
	function classesActive(href: string): string {
		return href === $page.url.pathname ? '!bg-primary-500' : '';
	}

	// Determine current navigation links based on the current route
	$: currentNavLinks =
		navLinksMapping[
			Object.keys(navLinksMapping).find((key) => $page.url.pathname.startsWith(key)) || '/docs'
		] || [];
</script>

<div class="flex w-full h-full">
	<div>
		<AppRail background="bg-surface-50-900-token card rounded-none">
			<AppRailAnchor on:click={closeDrawer} href="/" class="block md:hidden">Home</AppRailAnchor>
			<AppRailAnchor href="/docs/introduction" selected={$page.url.pathname.startsWith('/docs/')}
				>Docs</AppRailAnchor
			>
			<AppRailAnchor href="/skaterxl/news" selected={$page.url.pathname.startsWith('/skaterxl/')}
				>Skater XL</AppRailAnchor
			>
			<AppRailAnchor href="/session/news" selected={$page.url.pathname.startsWith('/session/')}>
				Session</AppRailAnchor
			>
			<AppRailAnchor href="/skate/news" selected={$page.url.pathname.startsWith('/skate/')}
				>Skate.</AppRailAnchor
			>
		</AppRail>
	</div>
	<nav class="list-nav w-full px-4 py-6 bg-surface-50-900-token card rounded-none">
		<ul>
			{#each currentNavLinks as { title, url }}
				<li>
					<a
						on:click={closeDrawer}
						href={url}
						class={classesActive(url)}
						data-sveltekit-preload-data="hover">{title}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</div>
