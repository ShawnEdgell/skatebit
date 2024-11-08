<script lang="ts">
	import { navItems, LoginAvatar, LoginActions } from '$lib';
	import { onMount } from 'svelte';
	import { themes } from '$lib/data/themeData';

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
		<div class="navbar bg-base-100 w-full shadow-lg">
			<div class="flex-none md:hidden">
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
			<!-- Skater XL Dropdown -->
			<div class="dropdown dropdown-end hidden md:inline-block">
				<!-- Dropdown Toggle: "Skater XL" -->
				<label tabindex="0" class="btn btn-ghost flex items-center gap-0 md:gap-x-1">
					<span class="ml-2">Skater XL</span>
					<svg
						class="dropdown-arrow fill-current transition-transform duration-200"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
					>
						<path d="M7 10l5 5 5-5z" />
					</svg>
				</label>
				<!-- Dropdown Content -->
				<ul tabindex="0" class="bg-base-200 menu dropdown-content w-56 rounded-box p-2 shadow">
					{#each navItems as link}
						<li>
							<a href={link.href} class="btn btn-ghost">{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Theme Dropdown -->
			<div class="dropdown dropdown-end">
				<!-- Dropdown Toggle: "Theme" -->
				<label tabindex="0" class="btn btn-ghost flex items-center gap-0 md:gap-x-1">
					<!-- Theme Label -->
					<span class="ml-2 hidden md:inline-block">Theme</span>
					<!-- Theme Icon: Optional, can be hidden on small screens if navbar-end is hidden -->
					<svg
						class="inline-block h-7 w-7 fill-current md:hidden"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.8468 21.9342C5.86713 21.3624 2 17.1328 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.1565 18.7173 16.7325 15.9135 16.3703C14.2964 16.1614 12.8386 15.9731 12.2619 16.888C11.8674 17.5136 12.2938 18.2938 12.8168 18.8168C13.4703 19.4703 13.4703 20.5297 12.8168 21.1832C12.2938 21.7062 11.5816 22.0186 10.8468 21.9342ZM11.085 6.99976C11.085 7.82818 10.4134 8.49976 9.585 8.49976C8.75658 8.49976 8.085 7.82818 8.085 6.99976C8.085 6.17133 8.75658 5.49976 9.585 5.49976C10.4134 5.49976 11.085 6.17133 11.085 6.99976ZM6.5 13C7.32843 13 8 12.3284 8 11.5C8 10.6716 7.32843 10 6.5 10C5.67157 10 5 10.6716 5 11.5C5 12.3284 5.67157 13 6.5 13ZM17.5 13C18.3284 13 19 12.3284 19 11.5C19 10.6716 18.3284 10 17.5 10C16.6716 10 16 10.6716 16 11.5C16 12.3284 16.6716 13 17.5 13ZM14.5 8.49998C15.3284 8.49998 16 7.82841 16 6.99998C16 6.17156 15.3284 5.49998 14.5 5.49998C13.6716 5.49998 13 6.17156 13 6.99998C13 7.82841 13.6716 8.49998 14.5 8.49998Z"
						></path>
					</svg>
					<!-- Dropdown Arrow -->
					<svg
						class="dropdown-arrow fill-current transition-transform duration-200"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
					>
						<path d="M7 10l5 5 5-5z" />
					</svg>
				</label>
				<!-- Dropdown Content: Theme Options -->
				<div
					class="bg-base-200 menu dropdown-content max-h-96 w-56 overflow-y-scroll rounded-box p-2 shadow"
				>
					<ul tabindex="0">
						{#each themes as theme}
							<li>
								<button
									data-set-theme={theme}
									data-act-class="ACTIVE_CLASS"
									class="btn btn-ghost"
									on:click|preventDefault
								>
									{theme.charAt(0).toUpperCase() + theme.slice(1)}
								</button>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Profile Dropdown -->
			<details class="dropdown dropdown-end" bind:this={profileDropdown}>
				<summary tabindex="0" class="btn btn-ghost" on:keydown={handleKeyboardClick}>
					<LoginAvatar />
					<!-- Dropdown Arrow -->
					<svg
						class="dropdown-arrow fill-current transition-transform duration-200"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
					>
						<path d="M7 10l5 5 5-5z" />
					</svg>
				</summary>
				<ul class="dropdown-content menu bg-base-200 rounded-box z-[10] p-3 space-y-2 shadow w-56">
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

<style>
	/* Common styles for all dropdown arrows */
	.dropdown-arrow {
		transition: transform 0.2s ease-in-out;
	}

	/* Rotate arrow on hover and focus for label-based dropdowns */
	.dropdown:hover .dropdown-arrow,
	.dropdown:focus-within .dropdown-arrow {
		transform: rotate(180deg);
	}

	/* Rotate arrow when <details> is open for the profile dropdown */
	.dropdown[open] .dropdown-arrow {
		transform: rotate(180deg);
	}
</style>
