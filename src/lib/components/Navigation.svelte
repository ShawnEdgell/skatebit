<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	// Enhanced array of objects including navigation buttons for each game
	const games = [
		{
			label: 'Skater XL',
			actions: [
				{ label: 'Play', link: '/games/skaterxl' },
				{ label: 'Details', link: '/games/skaterxl' }
			]
		},
		{
			label: 'Session',
			actions: [
				{ label: 'Launch', link: '/games/session' },
				{ label: 'Learn More', link: '/games/session' }
			]
		},
		{
			label: 'Skate.',
			actions: [
				{ label: 'Start', link: '/games/skate' },
				{ label: 'Explore', link: '/games/skate' }
			]
		}
	];
</script>

{#each games as { label, actions }, i}
	<!-- Trigger -->
	<button
		class="btn variant-filled-surface-900"
		use:popup={{ event: 'click', target: 'popup-' + i, placement: 'top' }}
	>
		{label}
	</button>
	<!-- Popup -->
	<div class="card p-4" data-popup={'popup-' + i}>
		<div class="popup-content flex flex-col items-center flex-1 gap-3">
			{#each actions as { label, link }}
				<nav class="list-nav">
					<!-- (optionally you can provide a label here) -->
					<ul>
						<li>
							<a href={link}>
								<span class="badge bg-primary-500">(icon)</span>
								<span class="flex-auto">Skeleton</span>
							</a>
						</li>
						<!-- ... -->
					</ul>
				</nav>
			{/each}
		</div>
	</div>
{/each}
