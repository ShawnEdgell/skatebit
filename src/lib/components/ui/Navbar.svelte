<script lang="ts">
	import { navItems, LoginAvatar, LoginActions } from '$lib';
	import { onMount } from 'svelte';

	let isLoginDropdownOpen = false;
	let isThemeDropdownOpen = false;

	function setTheme(theme: string) {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('selected-theme', theme);
	}

	onMount(() => {
		const savedTheme = localStorage.getItem('selected-theme');
		if (savedTheme) {
			setTheme(savedTheme);
		}
	});

	function toggleDropdown(dropdown: 'theme' | 'login') {
		if (dropdown === 'theme') {
			isThemeDropdownOpen = !isThemeDropdownOpen;
			isLoginDropdownOpen = false;
		} else if (dropdown === 'login') {
			isLoginDropdownOpen = !isLoginDropdownOpen;
			isThemeDropdownOpen = false;
		}
	}

	function handleKeyboardClick(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			(event.currentTarget as HTMLElement).click();
		}
	}
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
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
						<li><a class="btn btn-ghost rounded-btn" {href}><span>{label}</span></a></li>
					{/each}
				</ul>
			</div>

			<!-- Theme Dropdown -->
			<div class="dropdown dropdown-end">
				<div
					role="button"
					tabindex="0"
					class="btn btn-ghost"
					aria-haspopup="true"
					on:click={() => toggleDropdown('theme')}
					on:keydown={handleKeyboardClick}
				>
					<span>Theme</span>
				</div>
				{#if isThemeDropdownOpen}
					<ul
						class="dropdown-content menu shadow bg-base-100 rounded-box w-64 h-96 overflow-y-scroll p-3 z-10"
					>
						{#each ['dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'] as theme}
							<li>
								<div
									class="p-4"
									role="button"
									tabindex="0"
									on:click={() => setTheme(theme)}
									on:keydown={handleKeyboardClick}
								>
									{theme}
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<!-- Profile/Login Dropdown -->
			<div class="dropdown dropdown-end login-dropdown">
				<div
					role="button"
					tabindex="0"
					class="btn btn-ghost"
					aria-haspopup="true"
					on:click={() => toggleDropdown('login')}
					on:keydown={handleKeyboardClick}
				>
					<LoginAvatar />
				</div>
				{#if isLoginDropdownOpen}
					<ul
						class="dropdown-content menu bg-base-100 rounded-box z-[10] p-3 space-y-2 shadow w-56"
					>
						<LoginActions />
					</ul>
				{/if}
			</div>
		</div>
	</div>

	<div class="drawer-side">
		<label for="my-drawer-3" class="drawer-overlay" aria-label="Close sidebar"></label>
		<ul class="menu menu-lg bg-base-200 min-h-full w-80 p-4">
			{#each navItems as { href, label }}
				<li><a {href}><span>{label}</span></a></li>
			{/each}
		</ul>
	</div>
</div>
