<script lang="ts">
	import { navItems, LoginAvatar, LoginActions } from '$lib';
	import { onMount, onDestroy } from 'svelte';

	let dropdownRef: HTMLDetailsElement;

	function closeDropdown() {
		if (dropdownRef) dropdownRef.open = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			closeDropdown();
		}
	}

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
		}
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-300 w-full">
			<div class="flex-none sm:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost" aria-label="Open sidebar">
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
			<div class="mx-2 flex-1">
				<a href="/" class="btn btn-ghost italic font-extrabold text-xl">SKATEBIT</a>
			</div>
			<div class="hidden flex-none sm:block">
				<ul class="menu menu-horizontal">
					{#each navItems as { href, label }}
						<li>
							<a class="btn btn-ghost rounded-btn" {href}>
								<span>{label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="dropdown dropdown-end">
				<button aria-haspopup="true" class="btn m-1">
					<span>Theme</span>
				</button>
				<ul
					class="dropdown-content menu shadow bg-base-100 rounded-box w-64 h-96 overflow-y-scroll p-4 space-y-2 z-10"
				>
					<div>
						{#each ['dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'] as theme}
							<li>
								<button class="p-4" data-set-theme={theme} data-act-class="active">{theme}</button>
							</li>
						{/each}
					</div>
				</ul>
			</div>

			<details bind:this={dropdownRef} class="dropdown dropdown-end">
				<summary class="btn btn-ghost m-1">
					<div>
						<LoginAvatar />
					</div>
				</summary>
				<button
					on:click={closeDropdown}
					class="dropdown-content menu bg-base-100 rounded-box z-[10] p-2 shadow"
				>
					<ul class="menu p-2 w-56 bg-base-100 rounded-box shadow space-y-2">
						<LoginActions />
					</ul>
				</button>
			</details>
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" aria-label="Close sidebar"></label>
		<ul class="menu menu-lg bg-base-200 min-h-full w-80 p-4">
			{#each navItems as { href, label }}
				<li>
					<a {href}>
						<span>{label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
