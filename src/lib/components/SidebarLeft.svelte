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
			{ title: 'Page 1', url: '/skaterxl/page1' },
			{ title: 'Page 2', url: '/skaterxl/page2' }
		],
		'/session': [
			{ title: 'Page 1', url: '/session/page1' },
			{ title: 'Page 2', url: '/session/page2' }
		],
		'/skate': [
			{ title: 'Page 1', url: '/skate/page1' },
			{ title: 'Page 2', url: '/skate/page2' }
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
		<AppRailAnchor href="/skaterxl/page1" selected={$page.url.pathname.startsWith('/skaterxl/')}
			>Skater XL</AppRailAnchor
		>
		<AppRailAnchor href="/session/page1" selected={$page.url.pathname.startsWith('/session/')}>
			Session</AppRailAnchor
		>
		<AppRailAnchor href="/skate/page1" selected={$page.url.pathname.startsWith('/skate/')}
			>Skate.</AppRailAnchor
		>
	</AppRail>
</div>

<nav class="list-nav w-full p-4 bg-surface-50-900-token card">
	<ul>
		{#each currentNavLinks as { title, url }}
			<li>
				<a href={url} class={classesActive(url)} data-sveltekit-preload-data="hover">{title}</a>
			</li>
		{/each}
	</ul>
</nav>
