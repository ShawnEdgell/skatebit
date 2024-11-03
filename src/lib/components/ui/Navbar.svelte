<script lang="ts">
	import { navItems, LoginAvatar, LoginActions } from '$lib';
	import { onMount } from 'svelte';

	// References to the dropdown elements
	let themeDropdown: HTMLDetailsElement;
	let profileDropdown: HTMLDetailsElement;

	// Function to set the theme
	function setTheme(theme: string) {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}

	// Handle keyboard interactions for accessibility
	function handleKeyboardClick(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			(event.currentTarget as HTMLElement).click();
		}
	}

	// Function to handle clicks outside the dropdowns
	function handleClickOutside(event: MouseEvent) {
		if (themeDropdown && !themeDropdown.contains(event.target as Node)) {
			themeDropdown.removeAttribute('open');
		}
		if (profileDropdown && !profileDropdown.contains(event.target as Node)) {
			profileDropdown.removeAttribute('open');
		}
	}

	onMount(() => {
		// Apply saved theme on load
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			setTheme(savedTheme);
		}

		// Add global click listener
		document.addEventListener('click', handleClickOutside);

		// Cleanup listener on component destroy
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar bg-base-300 w-full">
			<div class="flex-none sm:hidden">
				<label for="my-drawer-3" class="btn btn-square btn-ghost" aria-label="Open sidebar">
					<!-- Hamburger Icon -->
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
						<li><a class="btn btn-ghost rounded-btn" {href}><span>{label}</span></a></li>
					{/each}
				</ul>
			</div>

			<!-- Theme Dropdown -->
			<details class="dropdown dropdown-end" bind:this={themeDropdown}>
				<summary tabindex="0" class="btn btn-ghost" on:keydown={handleKeyboardClick}>
					<span>Theme</span>
				</summary>
				<ul
					class="dropdown-content menu shadow bg-base-100 rounded-box w-64 h-96 overflow-y-scroll p-3 z-10"
				>
					<div>
						{#each ['dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'] as theme}
							<li>
								<div
									role="button"
									tabindex="0"
									class="p-4"
									on:click={() => setTheme(theme)}
									on:keydown={handleKeyboardClick}
								>
									{theme}
								</div>
							</li>
						{/each}
					</div>
				</ul>
			</details>

			<!-- Profile Dropdown -->
			<details class="dropdown dropdown-end" bind:this={profileDropdown}>
				<summary tabindex="0" class="btn btn-ghost" on:keydown={handleKeyboardClick}>
					<LoginAvatar />
				</summary>
				<ul class="dropdown-content menu bg-base-100 rounded-box z-[10] p-3 space-y-2 shadow w-56">
					<LoginActions />
				</ul>
			</details>
		</div>
	</div>

	<!-- Sidebar -->
	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" aria-label="Close sidebar"></label>
		<ul class="menu menu-lg bg-base-200 min-h-full w-80 p-4">
			{#each navItems as { href, label }}
				<li><a {href}><span>{label}</span></a></li>
			{/each}
		</ul>
	</div>
</div>
