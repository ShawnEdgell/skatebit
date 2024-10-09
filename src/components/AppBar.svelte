<script lang="ts">
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import Popups from './Popups.svelte';

	const drawerStore = getDrawerStore();
	const openDrawer = () => drawerStore.open({ id: 'main-menu' });
</script>

<AppBar
	gridColumns="grid-cols-3"
	slotDefault="place-self-center md:place-self-center"
	slotTrail="place-content-end"
>
	<!-- Lead Slot -->
	<svelte:fragment slot="lead">
		<!-- Hamburger Icon -->
		<button class="md:hidden" on:click={openDrawer}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				stroke="currentColor"
				viewBox="0 0 24 24"
				stroke-width="3"
				class="w-6 h-6"
			>
				<line x1="3" y1="6" x2="21" y2="6" />
				<line x1="3" y1="12" x2="21" y2="12" />
				<line x1="3" y1="18" x2="21" y2="18" />
			</svg>
		</button>
		<!-- Logo for larger screens -->
		<a
			href="/"
			class="btn p-0 hidden md:flex items-center text-2xl font-extrabold italic"
			data-sveltekit-preload-data="hover"
		>
			<!-- SVG Icon -->
			<svg
				class="w-6 h-6 mr-2"
				viewBox="0 -0.29 54.369 54.369"
				xmlns="http://www.w3.org/2000/svg"
				fill="#000000"
				><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g><g id="SVGRepo_iconCarrier">
					<g id="Group_10" data-name="Group 10" transform="translate(-786.215 -503.445)">
						<path
							id="Path_29"
							data-name="Path 29"
							d="M833.076,538.814a18.275,18.275,0,0,0,5.508-12.82c0-11.349-11.275-20.549-25.184-20.549s-25.185,9.2-25.185,20.549a18.267,18.267,0,0,0,5.509,12.82,8.684,8.684,0,1,0,11.815,11.412,8.674,8.674,0,0,0,15.722,0,8.683,8.683,0,1,0,11.815-11.412Z"
							fill="#ffffff"
							stroke="#231f20"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="4"
						></path>
						<path
							id="Path_30"
							data-name="Path 30"
							d="M810.2,526.606A6.406,6.406,0,1,1,803.8,520.2,6.408,6.408,0,0,1,810.2,526.606Z"
							fill="#d1d3d4"
							stroke="#231f20"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="4"
						></path>
						<path
							id="Path_31"
							data-name="Path 31"
							d="M828.976,526.606a6.407,6.407,0,1,1-6.408-6.406A6.409,6.409,0,0,1,828.976,526.606Z"
							fill="#d1d3d4"
							stroke="#231f20"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="4"
						></path>
					</g>
				</g></svg
			>
			Skatebit
		</a>
	</svelte:fragment>

	<!-- Center Title for mobile -->
	<a
		href="/"
		class="block btn p-0 md:hidden text-2xl font-extrabold italic"
		data-sveltekit-preload-data="hover">Skatebit</a
	>

	<!-- Trail Slot -->
	<svelte:fragment slot="trail">
		<Popups />
		<LightSwitch />
	</svelte:fragment>
</AppBar>
