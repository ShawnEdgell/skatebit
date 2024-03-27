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
				{ label: 'News', link: '/docs/news' },
				{ label: 'Skater XL', link: '/skaterxl/news' },
				{ label: 'Session', link: '/session/news' },
				{ label: 'Skate.', link: '/skate/news' }
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
	<button
		class="btn hover:bg-primary-500/10 flex items-center space-x-1 relative"
		use:popup={{ ...popupSettings, target: `popup-${i}` }}
	>
		<span>{label}</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 16 16"
			fill="currentColor"
			style="position: relative; top: 2px;"
		>
			<path
				d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592c.86 0 1.319 1.012.753 1.658l-4.796 5.482a.5.5 0 0 1-.506.0z"
			/>
		</svg>
	</button>

	<!-- Corresponding Popup -->
	<div class="card p-4 z-1000" data-popup={`popup-${i}`}>
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
						{#if label === 'News'}
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

<a
	href="https://discord.gg/uDkSEBKdga"
	target="_blank"
	class="btn hover:bg-primary-500/10 rounded-full p-2 inline-flex items-center justify-center"
>
	<svg
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z"
			fill="currentColor"
		/>
	</svg>
</a>
