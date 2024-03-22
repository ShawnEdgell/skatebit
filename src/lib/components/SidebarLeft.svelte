<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
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
			{ title: 'Get Started', url: '/docs/get-started' }
			// Add more links as needed
		],
		'/skaterxl': [
			{ title: 'About', url: '/skaterxl/about' },
			{ title: 'News', url: '/skaterxl/news' },
			{ title: 'Guides', url: '/skaterxl/guides' },
			{ title: 'Mods', url: '/skaterxl/mods' },
			{ title: 'Stats', url: '/skaterxl/stats' }
		],
		'/session': [
			{ title: 'About', url: '/session/about' },
			{ title: 'News', url: '/session/news' },
			{ title: 'Guides', url: '/session/guides' },
			{ title: 'Mods', url: '/session/mods' },
			{ title: 'Stats', url: '/session/stats' }
		],
		'/skate': [
			{ title: 'About', url: '/skate/about' },
			{ title: 'News', url: '/skate/news' }
		]
	};

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');

	// Default to '/docs' if no specific section matches
	$: currentNavLinks =
		navLinksMapping[
			Object.keys(navLinksMapping).find((key) => $page.url.pathname.startsWith(key)) || '/docs'
		] || [];
</script>

<div>
	<AppRail background="bg-surface-50-900-token card">
		<AppRailAnchor href="/docs/introduction" selected={$page.url.pathname.startsWith('/docs/')}
			>Docs</AppRailAnchor
		>
		<AppRailAnchor href="/skaterxl/about" selected={$page.url.pathname.startsWith('/skaterxl/')}
			>Skater XL</AppRailAnchor
		>
		<AppRailAnchor href="/session/about" selected={$page.url.pathname.startsWith('/session/')}>
			Session</AppRailAnchor
		>
		<AppRailAnchor href="/skate/about" selected={$page.url.pathname.startsWith('/skate/')}
			>Skate.</AppRailAnchor
		>
	</AppRail>
</div>

<nav class="list-nav w-full px-4 py-8 bg-surface-50-900-token card">
	<ul>
		{#each currentNavLinks as { title, url }}
			<li>
				<a href={url} class={classesActive(url)} data-sveltekit-preload-data="hover">{title}</a>
			</li>
		{/each}
	</ul>
</nav>
