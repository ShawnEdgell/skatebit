<script lang="ts">
	import { AppRail, AppRailTile, AppRailAnchor, getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { currentTileIndex } from '$lib/stores/stores';
	const urlToTabMap = {
		'/Hub': 0,
		'/skaterxl': 1,
		'/session': 2,
		'/skate': 3,
		'/bmxstreets': 4
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
						<svg class="h-6 w-full" viewBox="0 0 24 24" fill="none">
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
			<AppRailTile bind:group={currentTile} id="Hub" name="tile-1" value={0} title="tile-1">
				<svelte:fragment slot="lead">
					<svg class="h-6 w-full" viewBox="0 0 24 24" fill="none">
						<path
							d="M13 20V18C13 15.2386 10.7614 13 8 13C5.23858 13 3 15.2386 3 18V20H13ZM13 20H21V19C21 16.0545 18.7614 14 16 14C14.5867 14 13.3103 14.6255 12.4009 15.6311M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM18 9C18 10.1046 17.1046 11 16 11C14.8954 11 14 10.1046 14 9C14 7.89543 14.8954 7 16 7C17.1046 7 18 7.89543 18 9Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				<span>Hub</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} id="skaterxl" name="tile-2" value={1} title="tile-2">
				<svelte:fragment slot="lead">
					<svg class="h-6 w-full" viewBox="0 0 24 24" fill="none">
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
					<svg class="h-6 w-full" viewBox="0 0 24 24" fill="none">
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
					<svg class="h-6 w-full" viewBox="0 0 24 24" fill="none">
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
			<AppRailTile bind:group={currentTile} id="bmxstreets" name="tile-3" value={4} title="tile-5">
				<svelte:fragment slot="lead">
					<svg class="h-6 w-full" viewBox="0 0 24 24" fill="none">
						<path
							d="M18.763 13.7944L20.029 16.0222C19.8786 16.3163 19.7105 16.6051 19.5244 16.8873C19.3383 17.1695 19.1391 17.4378 18.9281 17.6919L16.4377 17.4142C15.7715 17.9608 15.0027 18.3869 14.1645 18.6592L13.0002 20.945C12.6719 20.9813 12.3382 21 12.0002 21C11.6622 21 11.3285 20.9813 11.0002 20.945L9.83293 18.6582C8.99428 18.3854 8.22514 17.9585 7.5589 17.4111L5.05407 17.6915C4.84303 17.4374 4.64381 17.1691 4.45774 16.8869C4.27168 16.6047 4.10356 16.3159 3.95312 16.0218L5.22637 13.7814C5.07803 13.2142 5.00021 12.6139 5.00021 12.0002C5.00021 11.3749 5.08219 10.7688 5.23599 10.192L3.95351 7.936C4.10394 7.64191 4.27206 7.3531 4.45812 7.07091C4.64419 6.78873 4.84341 6.52043 5.05445 6.2663L7.60942 6.55327C8.26776 6.02075 9.01625 5.60683 9.84 5.33984M9.83614 5.33996L11 3.05493C11.3283 3.01863 11.662 3 12 3C12.338 3 12.6716 3.01863 13 3.05493L14.1638 5.33996C14.9882 5.60716 15.7389 6.01764 16.3976 6.55077L18.9275 6.26661C19.1385 6.52074 19.3377 6.78904 19.5238 7.07123C19.7098 7.35341 19.878 7.64223 20.0284 7.93632L18.7592 10.1697M18.7594 10.1732C18.9164 10.7556 19.0002 11.3681 19.0002 12.0002C19.0002 12.6215 18.9193 13.2239 18.7673 13.7974M15.0002 12.0002C15.0002 13.657 13.6571 15.0002 12.0002 15.0002C10.3433 15.0002 9.0002 13.657 9.0002 12.0002C9.0002 10.3433 10.3433 9.00015 12.0002 9.00015C13.6571 9.00015 15.0002 10.3433 15.0002 12.0002Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</svelte:fragment>
				<span>BMXS</span>
			</AppRailTile>
			<!-- --- -->
		</AppRail>
	</div>
	<div class="p-4 w-full">
		{#if currentTile === 0}
			<!-- Render the Hub nav list -->
			<nav class="list-nav">
				<!-- (optionally you can provide a label here) -->
				<ul>
					<li>
						<a
							href="/info"
							class={classesActive('/info')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Info</a
						>
					</li>
					<li>
						<a
							href="/news"
							class={classesActive('/news')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							News</a
						>
					</li>
					<li>
						<a
							href="/forums"
							class={classesActive('/forums')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Forums</a
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
							href="/skaterxl/faq"
							class={classesActive('/skaterxl/faq')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							FAQ
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
					<li>
						<a
							href="/skaterxl/links"
							class={classesActive('/skaterxl/links')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Helpful Links
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
		{:else if currentTile === 4}
			<!-- Render the Skate nav list -->

			<nav class="list-nav">
				<!-- (optionally you can provide a label here) -->
				<ul>
					<li>
						<a
							href="/bmxstreets/about"
							class={classesActive('/bmxstreets/about')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							About
						</a>
					</li>
					<li>
						<a
							href="/bmxstreets/guides"
							class={classesActive('/bmxstreets/guides')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Guides
						</a>
					</li>
					<li>
						<a
							href="/bmxstreets/mods"
							class={classesActive('/bmxstreets/mods')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							Mods
						</a>
					</li>
					<li>
						<a
							href="/bmxstreets/reshade"
							class={classesActive('/bmxstreets/reshade')}
							data-sveltekit-preload-data="hover"
							on:click={closeDrawer}
						>
							ReShade
						</a>
					</li>
					<!-- ... -->
				</ul>
			</nav>
		{/if}
	</div>
</div>
