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
			{ title: 'Guides', url: '/session/guides' },
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
			<AppRailAnchor on:click={closeDrawer} href="/" class="block md:hidden">
				<svelte:fragment slot="lead">
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
						<path
							d="M10 7.5V6.2C10 5.0799 10 4.51984 10.218 4.09202C10.4097 3.71569 10.7157 3.40973 11.092 3.21799C11.5198 3 12.0799 3 13.2 3H17.8C18.9201 3 19.4802 3 19.908 3.21799C20.2843 3.40973 20.5903 3.71569 20.782 4.09202C21 4.51984 21 5.0799 21 6.2V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H16M14 7H17M14 11H17M3 16L7.42372 11.9784C7.8038 11.6329 7.99384 11.4601 8.20914 11.3947C8.39876 11.337 8.60124 11.337 8.79086 11.3947C9.00616 11.4601 9.1962 11.6329 9.57628 11.9784L14 16M5 14.1818V19.4C5 19.9601 5 20.2401 5.10899 20.454C5.20487 20.6422 5.35785 20.7951 5.54601 20.891C5.75992 21 6.03995 21 6.6 21H10.4C10.9601 21 11.2401 21 11.454 20.891C11.6422 20.7951 11.7951 20.6422 11.891 20.454C12 20.2401 12 19.9601 12 19.4L12 14.1818"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				Home
			</AppRailAnchor>
			<AppRailAnchor href="/docs/introduction" selected={$page.url.pathname.startsWith('/docs/')}>
				<svelte:fragment slot="lead">
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
						<path
							d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				Docs
			</AppRailAnchor>
			<AppRailAnchor href="/skaterxl/news" selected={$page.url.pathname.startsWith('/skaterxl/')}>
				<svelte:fragment slot="lead">
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
						<path
							d="M8 8.5C8 9.88071 6.88071 11 5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6C6.88071 6 8 7.11929 8 8.5ZM8 8.5H21M16 15.5C16 16.8807 17.1193 18 18.5 18C19.8807 18 21 16.8807 21 15.5C21 14.1193 19.8807 13 18.5 13C17.1193 13 16 14.1193 16 15.5ZM16 15.5H3"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				Skater XL
			</AppRailAnchor>
			<AppRailAnchor href="/session/news" selected={$page.url.pathname.startsWith('/session/')}>
				<svelte:fragment slot="lead">
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
						<path
							d="M14 4H8C7.06812 4 6.60218 4 6.23463 4.15224C5.74458 4.35523 5.35523 4.74458 5.15224 5.23463C5 5.60218 5 6.56812 5 7.5V8.00085M6 11H13M5 8.00085C5.12187 8 5.25465 8 5.4 8H13.6C14.4401 8 14.8601 8 15.181 8.16349C15.4632 8.3073 15.6927 8.53677 15.8365 8.81901C16 9.13988 16 9.55992 16 10.4V16.8C16 17.9201 16 18.4802 15.782 18.908C15.5903 19.2843 15.2843 19.5903 14.908 19.782C14.4802 20 13.9201 20 12.8 20H6.2C5.07989 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8V10.4C3 9.55992 3 9.13988 3.16349 8.81901C3.3073 8.53677 3.53677 8.3073 3.81901 8.16349C4.08436 8.02829 4.41754 8.00489 5 8.00085ZM16 12L19.7884 9.72696C20.185 9.48902 20.3833 9.37005 20.5464 9.38525C20.6887 9.39851 20.8185 9.472 20.903 9.58716C21 9.71924 21 9.95048 21 10.413V17.587C21 18.0495 21 18.2808 20.903 18.4128C20.8185 18.528 20.6887 18.6015 20.5464 18.6147C20.3833 18.63 20.185 18.511 19.7884 18.273L16 16"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				Session
			</AppRailAnchor>
			<AppRailAnchor href="/skate/news" selected={$page.url.pathname.startsWith('/skate/')}>
				<svelte:fragment slot="lead">
					<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
						<path
							d="M3.63063 8.36953L8.32394 3.67622C9.24967 2.75049 10.7642 2.76409 11.7067 3.70659C12.6492 4.64909 12.6628 6.16358 11.737 7.08931L3.69136 15.135C2.76563 16.0607 2.77923 17.5752 3.72172 18.5177C4.66422 19.4602 6.17872 19.4738 7.10445 18.5481L15.1501 10.5024C16.0758 9.57668 17.5903 9.59027 18.5328 10.5328C19.4753 11.4753 19.4897 12.989 18.564 13.9147L15.5461 16.9326C13.7672 18.7115 16.2311 21.5867 18.2159 20.8364C18.7683 20.6276 21 18.9985 21 18.9985"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				Skate.
			</AppRailAnchor>
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
