<script lang="ts">
	import ThemeController from './ThemeController.svelte';
	import { navItems } from '$lib/data/navItems';
	let drawerOpen = false;

	function closeDrawer() {
		drawerOpen = false;
	}
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-200 w-full justify-between">
			<div class="flex items-center">
				<div class="flex-none lg:hidden">
					<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-6 w-6 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					</label>
				</div>
				<div class="ps-4">
					<a href="/" class="text-lg font-bold">skatebit</a>
				</div>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal">
					<!-- Navbar menu content here -->
					{#each navItems as { href, label }}
						<li class="hidden lg:block">
							<a {href}>
								<span>{label}</span>
							</a>
						</li>
					{/each}
					<li><ThemeController /></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu bg-base-200 min-h-full w-80 p-4">
			<!-- Sidebar content here -->
			{#each navItems as { href, label }}
				<li>
					<a class="btn-xl" {href} on:click={closeDrawer}>
						<span>{label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
