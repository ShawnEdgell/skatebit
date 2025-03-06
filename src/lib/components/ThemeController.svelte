<script lang="ts">
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	type Theme = {
		label: string;
		value: string;
	};

	const themes: Theme[] = [
		{ label: 'Dark', value: 'default' },
		{ label: 'Dim', value: 'dim' },
		{ label: 'Dracula', value: 'dracula' },
		{ label: 'Cyberpunk', value: 'cyberpunk' },
		{ label: 'Nord', value: 'nord' }
	];

	// Default to the first theme
	let selectedTheme: string = themes[0].value;

	onMount(() => {
		// Initialize theme-change; false parameter is required for Svelte
		themeChange(false);

		// Sync the component's state with the theme already applied in app.html (if any)
		const currentTheme = document.documentElement.getAttribute('data-theme');
		if (currentTheme) {
			selectedTheme = currentTheme;
		}
	});

	function handleChange() {
		// Save the current theme to localStorage whenever it changes
		localStorage.setItem('theme', selectedTheme);
		console.log('Theme saved:', selectedTheme);
	}
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="flex items-center gap-2">
		<span>Theme</span>
		<svg
			width="12px"
			height="12px"
			class="inline-block h-2 w-2 fill-current opacity-60"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048"
		>
			<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
		</svg>
	</div>
	<!-- Removed tabindex from the <ul> -->
	<ul class="dropdown-content bg-base-200 rounded-box top-12 z-100 mt-6 w-52 p-2 shadow-2xl">
		{#each themes as { label, value }}
			<li>
				<input
					type="radio"
					name="theme-dropdown"
					class="theme-controller btn btn-ghost w-full justify-start"
					aria-label={label}
					data-set-theme={value}
					{value}
					bind:group={selectedTheme}
					on:change={handleChange}
				/>
			</li>
		{/each}
	</ul>
</div>
