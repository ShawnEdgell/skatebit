<script lang="ts">
	// Import navigation items from the constants file
	import { navItems } from '../constants/navItems';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	// Popup settings
	let popupSettings: Omit<PopupSettings, 'target'> = {
		event: 'click',
		placement: 'bottom',
		middleware: { offset: 6 }
	};
</script>

<!-- Popup trigger button -->
<button
	class="btn hover:bg-primary-500/10 hidden md:flex items-center space-x-1 relative"
	use:popup={{ ...popupSettings, target: 'popup-0' }}
	aria-haspopup="true"
	aria-controls="popup-0"
>
	<span class="font-medium">Skater XL</span>
	<svg class="w-4 h-4 align-middle" viewBox="0 0 16 16" fill="currentColor">
		<path
			d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592c.86 0 1.319 1.012.753 1.658L8.753 11.14a.5.5 0 0 1-.506 0z"
		/>
	</svg>
</button>

<!-- Corresponding Popup -->
<div
	class="card shadow-xl rounded-2xl p-4 z-1000 bg-surface-200-700-token"
	data-popup="popup-0"
	role="menu"
>
	<nav class="list-nav font-medium">
		<ul>
			{#each navItems as { href, label, icon }}
				<li>
					<a {href} class="w-56 flex items-center gap-2" data-sveltekit-preload-data="hover">
						<span>{@html icon}</span>
						<span class="flex-auto">{label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
