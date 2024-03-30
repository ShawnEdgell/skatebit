<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	// Assume popupSettings are correctly abstracted if sensitive or reused.
	let popupSettings: Omit<PopupSettings, 'target'> = {
		event: 'click',
		placement: 'bottom',
		middleware: { offset: 8 }
	};

	const navItems = [
		{ href: '/', label: 'Homepage' },
		{ href: '/docs/introduction', label: 'Introduction' },
		{ href: '/docs/news', label: 'News' },
		null, // Represents a divider
		{ href: '/skaterxl/about', label: 'Skater XL' },
		{ href: '/session/about', label: 'Session' },
		{ href: '/skate/about', label: 'Skate.' }
	];
</script>

<button
	class="btn hover:bg-primary-500/10 hidden md:flex items-center space-x-1 relative"
	use:popup={{ ...popupSettings, target: 'popup-0' }}
	aria-haspopup="true"
	aria-controls="popup-0"
>
	<span>Explore</span>
	<svg class="w-4 h-4 align-middle" viewBox="0 0 16 16" fill="currentColor">
		<path
			d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592c.86 0 1.319 1.012.753 1.658l-4.796 5.562a.5.5 0 0 1-.506.0z"
		/>
	</svg>
</button>

<!-- Corresponding Popup -->
<div class="card p-4 z-1000" data-popup="popup-0" role="menu">
	<nav class="list-nav">
		<ul>
			{#each navItems as item}
				{#if item}
					<li>
						<a
							href={item.href}
							class="w-56 flex items-center gap-2"
							data-sveltekit-preload-data="hover"
						>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">{item.label}</span>
						</a>
					</li>
				{:else}
					<li class="list-none py-2">
						<hr class="border-t-2" />
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
</div>
