<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { currentTileIndex } from '$lib/stores/stores';
	const urlToTabMap = {
		'/docs': 0,
		'/skaterxl': 1,
		'/session': 2,
		'/skate': 3
	};

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}

	function updateCurrentTile() {
		const newPath = $page.url.pathname.split('/')[1];
		const tabKey = '/' + newPath;
		const tabIndex = urlToTabMap[tabKey as keyof typeof urlToTabMap];
		if (tabIndex !== undefined) {
			currentTileIndex.set(tabIndex);
		}
	}

	onMount(updateCurrentTile);
	$: $page.url, updateCurrentTile();

	$: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');

	let currentTile = 0;
	currentTileIndex.subscribe((value) => {
		currentTile = value;
	});
</script>

<div class="card rounded-none flex w-full h-full bg-surface-50-900-token">
	<div>
		<AppRail background="card rounded-none bg-surface-50-900-token">
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/" on:click={closeDrawer} class="block sm:hidden">
					<svelte:fragment slot="lead">
						<svg class="h-6 w-full flex justify-center" viewBox="0 0 24 24" fill="none">
							<path
								d="M14 21.0001V15.0001H10V21.0001M19 9.77818V16.2001C19 17.8802 19 18.7203 18.673 19.362C18.3854 19.9265 17.9265 20.3855 17.362 20.6731C16.7202 21.0001 15.8802 21.0001 14.2 21.0001H9.8C8.11984 21.0001 7.27976 21.0001 6.63803 20.6731C6.07354 20.3855 5.6146 19.9265 5.32698 19.362C5 18.7203 5 17.8802 5 16.2001V9.77753M21 12.0001L15.5668 5.96405C14.3311 4.59129 13.7133 3.9049 12.9856 3.65151C12.3466 3.42894 11.651 3.42899 11.0119 3.65165C10.2843 3.90516 9.66661 4.59163 8.43114 5.96458L3 12.0001"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</svelte:fragment>
					<span>Home</span></AppRailAnchor
				>
			</svelte:fragment>
			<!-- --- -->
			<AppRailTile bind:group={currentTile} id="docs" name="tile-1" value={0} title="tile-1">
				<svelte:fragment slot="lead">
					<svg class="h-6 w-full flex justify-center" viewBox="0 0 24 24" fill="none">
						<path
							d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				<span>Docs</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} id="skaterxl" name="tile-2" value={1} title="tile-2">
				<svelte:fragment slot="lead">
					<svg class="h-6 w-full flex justify-center" viewBox="0 0 24 24" fill="none">
						<path
							d="M7 9H17M7 15H17M15 13V17M9 7V11M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				<span>Skater XL</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} id="session" name="tile-3" value={2} title="tile-3">
				<svelte:fragment slot="lead">
					<svg class="h-6 w-full flex justify-center" viewBox="0 0 24 24" fill="none">
						<path
							d="M14 4H8C7.06812 4 6.60218 4 6.23463 4.15224C5.74458 4.35523 5.35523 4.74458 5.15224 5.23463C5 5.60218 5 6.56812 5 7.5V8.00085M6 11H13M5 8.00085C5.12187 8 5.25465 8 5.4 8H13.6C14.4401 8 14.8601 8 15.181 8.16349C15.4632 8.3073 15.6927 8.53677 15.8365 8.81901C16 9.13988 16 9.55992 16 10.4V16.8C16 17.9201 16 18.4802 15.782 18.908C15.5903 19.2843 15.2843 19.5903 14.908 19.782C14.4802 20 13.9201 20 12.8 20H6.2C5.07989 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8V10.4C3 9.55992 3 9.13988 3.16349 8.81901C3.3073 8.53677 3.53677 8.3073 3.81901 8.16349C4.08436 8.02829 4.41754 8.00489 5 8.00085ZM16 12L19.7884 9.72696C20.185 9.48902 20.3833 9.37005 20.5464 9.38525C20.6887 9.39851 20.8185 9.472 20.903 9.58716C21 9.71924 21 9.95048 21 10.413V17.587C21 18.0495 21 18.2808 20.903 18.4128C20.8185 18.528 20.6887 18.6015 20.5464 18.6147C20.3833 18.63 20.185 18.511 19.7884 18.273L16 16"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				<span>Session</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} id="skate" name="tile-3" value={3} title="tile-4">
				<svelte:fragment slot="lead">
					<svg class="h-6 w-full flex justify-center" viewBox="0 0 24 24" fill="none">
						<path
							d="M3.63063 8.36953L8.32394 3.67622C9.24967 2.75049 10.7642 2.76409 11.7067 3.70659C12.6492 4.64909 12.6628 6.16358 11.737 7.08931L3.69136 15.135C2.76563 16.0607 2.77923 17.5752 3.72172 18.5177C4.66422 19.4602 6.17872 19.4738 7.10445 18.5481L15.1501 10.5024C16.0758 9.57668 17.5903 9.59027 18.5328 10.5328C19.4753 11.4753 19.4897 12.989 18.564 13.9147L15.5461 16.9326C13.7672 18.7115 16.2311 21.5867 18.2159 20.8364C18.7683 20.6276 21 18.9985 21 18.9985"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				<span>Skate.</span>
			</AppRailTile>
			<!-- --- -->
		</AppRail>
	</div>
	<div class="p-4 w-full">
		{#if currentTile === 0}
			<!-- Render the Docs nav list -->
			<nav class="list-nav">
				<!-- (optionally you can provide a label here) -->
				<ul>
					<li>
						<a
							href="/docs/news"
							class={classesActive('/docs/news')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							News
						</a>
					</li>
					<li>
						<a
							href="/docs/introduction"
							class={classesActive('/docs/introduction')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Introduction</a
						>
					</li>

					<!-- ... -->
				</ul>
			</nav>
		{:else if currentTile === 1}
			<!-- Render the Skater XL nav list -->
			<nav class="list-nav">
				<!-- (optionally you can provide a label here) -->
				<ul>
					<li>
						<a
							href="/skaterxl/about"
							class={classesActive('/skaterxl/about')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							About
						</a>
					</li>
					<li>
						<a
							href="/skaterxl/guides"
							class={classesActive('/skaterxl/guides')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Guides
						</a>
					</li>
					<li>
						<a
							href="/skaterxl/mods"
							class={classesActive('/skaterxl/mods')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Mods
						</a>
					</li>
					<li>
						<a
							href="/skaterxl/stats"
							class={classesActive('/skaterxl/stats')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Stats & Settings
						</a>
					</li>
					<li>
						<a
							href="/skaterxl/xlhub"
							class={classesActive('/skaterxl/xlhub')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							XL Hub
						</a>
					</li>
					<!-- ... -->
				</ul>
			</nav>
		{:else if currentTile === 2}
			<!-- Render the Session nav list -->
			<nav class="list-nav">
				<!-- (optionally you can provide a label here) -->
				<ul>
					<li>
						<a
							href="/session/about"
							class={classesActive('/session/about')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							About
						</a>
					</li>
					<li>
						<a
							href="/session/guides"
							class={classesActive('/session/guides')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Guides
						</a>
					</li>
					<li>
						<a
							href="/session/stats"
							class={classesActive('/session/stats')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Stats & Settings
						</a>
					</li>
					<!-- ... -->
				</ul>
			</nav>
		{:else if currentTile === 3}
			<!-- Render the Skate nav list -->

			<nav class="list-nav">
				<!-- (optionally you can provide a label here) -->
				<ul>
					<li>
						<a
							href="/skate/about"
							class={classesActive('/skate/about')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							About
						</a>
					</li>
					<!-- ... -->
				</ul>
			</nav>
		{/if}
	</div>
</div>
