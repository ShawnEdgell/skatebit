<script lang="ts">
	import { popup, LightSwitch } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	interface Action {
		label: string;
		link: string;
	}

	interface Game {
		label: string;
		actions: Action[];
	}

	// Define the games array with types
	const games: Game[] = [
		{
			label: 'Explore',
			actions: [
				{ label: 'Homepage', link: '/' },
				{ label: 'Documentation', link: '/docs/introduction' },
				{ label: 'Forums', link: '/forums' },
				{ label: 'Blog', link: '/blog' },
				{ label: 'Skater XL', link: '/skaterxl/page1' },
				{ label: 'Session', link: '/session' },
				{ label: 'Skate.', link: '/skate' }
			]
		},
		{
			label: 'Settings',
			actions: [{ label: 'Account', link: '/login' }]
		}
	];

	// Common settings for the popup, without 'target'
	let popupSettings: Omit<PopupSettings, 'target'> = {
		event: 'click',
		placement: 'bottom',
		middleware: { offset: 8 }
	};
</script>

{#each games as { label, actions }, i}
	<!-- Dynamically assign the 'target' for each button -->

	<button
		class="btn hover:variant-ghost-primary"
		use:popup={{ ...popupSettings, target: `popup-${i}` }}
	>
		{label}
	</button>

	<!-- Corresponding Popup -->
	<div class="card p-4" data-popup={`popup-${i}`}>
		<div class="popup-content space-y-1">
			{#each actions as { label, link }, index}
				<nav class="list-nav">
					<ul>
						<li>
							<a href={link} data-sveltekit-preload-data="hover">
								<div>
									<span class="badge bg-primary-500">(icon)</span>
									<span class="flex-auto">{label}</span>
								</div>
							</a>
						</li>
						{#if label === 'Blog'}
							<div class="py-2">
								<hr class="!border-t-2" />
							</div>
						{/if}
						{#if label === 'Account'}
							<div class="py-2">
								<hr class="!border-t-2" />
							</div>
							<div class="flex items-center justify-between">
								<h3>Mode</h3>
								<LightSwitch />
							</div>
						{/if}
					</ul>
				</nav>
			{/each}
		</div>
	</div>
{/each}
