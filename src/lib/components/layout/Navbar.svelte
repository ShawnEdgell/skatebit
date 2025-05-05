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
					<div></div>
					<a href="/" class="flex items-center justify-center text-lg font-bold">
						<svg
							class="mr-2 hidden h-5 w-5 md:block"
							fill="currentColor"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#ffffff"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier">
								<title>unity</title>
								<path
									d="M25.94 25.061l-5.382-9.060 5.382-9.064 2.598 9.062-2.599 9.060zM13.946 24.191l-6.768-6.717h10.759l5.38 9.061-9.372-2.342zM13.946 7.809l9.371-2.342-5.379 9.061h-10.761zM30.996 12.917l-3.282-11.913-12.251 3.193-1.812 3.112-3.68-0.027-8.966 8.719 8.967 8.72 3.678-0.029 1.817 3.112 12.246 3.192 3.283-11.908-1.864-3.087z"
								></path>
							</g></svg
						>
						<span>skatebit</span>
					</a>
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
				<a class="btn btn-ghost btn-lg join-item" {href} on:click={closeDrawer}>
					{label}
				</a>
			{/each}
		</ul>
	</div>
</div>
