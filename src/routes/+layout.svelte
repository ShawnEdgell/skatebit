<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';
	import { initializeStores, storePopup, Modal, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import AppBar from '../components/AppBar.svelte';
	import Footer from '../components/Footer.svelte';
	import DrawerMenu from '../components/DrawerMenu.svelte'; // Import the DrawerMenu component
	import { navItems } from '../constants/navItems';
	import { page } from '$app/stores'; // Import the page store

	// Initialize stores for Skeleton UI and floating UI
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	initializeStores();
</script>

<Toast />
<Modal />
<DrawerMenu />

<!-- Fixed AppBar at the top -->
<div class="fixed top-0 left-0 w-full z-10">
	<AppBar />
</div>

<!-- Main Content Area -->

<!-- Sidebar: Fixed to the left on md and larger screens -->
<div class="hidden md:block fixed top-16 left-0 w-56">
	<nav class="list-nav font-medium h-full p-4 overflow-y-auto">
		<ul>
			{#each navItems as { href, label }}
				<li class="mb-2">
					<a
						{href}
						class={`${$page.url.pathname === href ? '!variant-filled-primary' : ''}`}
						aria-current={$page.url.pathname === href ? 'page' : undefined}
						data-sveltekit-preload-data="hover"
					>
						<span class="flex-auto">{label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<!-- Main Content: Adjusted with left margin on md and larger screens -->
<main class="prose lg:prose-xl dark:prose-invert px-4 pb-8 pt-[4.5rem] md:ml-56">
	<slot />
</main>

<!-- Footer at the bottom -->
<div class="mt-auto w-full">
	<Footer />
</div>
