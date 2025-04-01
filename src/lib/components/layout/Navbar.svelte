<script lang="ts">
	import LoginAvatar from '../auth/LoginAvatar.svelte';
	import { navItems } from '$lib/data/navItems';

	let drawerOpen = false;

	function closeDrawer() {
		drawerOpen = false;
	}
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />

	<!-- Main navbar content -->
	<div class="drawer-content w-full">
		<div class="navbar px-6">
			<div class="mx-auto flex w-full max-w-7xl items-center justify-between">
				<!-- Left side -->
				<div class="flex items-center gap-2">
					<!-- Mobile menu toggle -->
					<div class="md:hidden">
						<label
							for="my-drawer-3"
							class="btn btn-square btn-ghost"
							aria-label="Toggle navigation menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</label>
					</div>

					<!-- Logo -->
					<a href="/" class="text-lg font-bold">skatebit</a>
				</div>

				<!-- Desktop menu + avatar -->
				<div class="flex items-center gap-2">
					<ul class="menu menu-sm menu-horizontal hidden md:flex">
						{#each navItems as { href, label }}
							<li><a {href}>{label}</a></li>
						{/each}
					</ul>
					<LoginAvatar />
				</div>
			</div>
		</div>
	</div>

	<!-- Drawer (mobile nav) -->
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay"></label>
		<ul class="menu join join-vertical bg-base-200 min-h-full w-80 p-4">
			{#each navItems as { href, label }}
				<a class="btn btn-lg join-item" {href} on:click={closeDrawer}>
					{label}
				</a>
			{/each}
		</ul>
	</div>
</div>
