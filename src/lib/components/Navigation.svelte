<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';

	// Enhanced array of objects including navigation buttons for each game
	const games = [
		{
			label: 'Skater XL',
			actions: [
				{ label: 'Play', link: '/' },
				{ label: 'Details', link: '/' }
			]
		},
		{
			label: 'Session',
			actions: [
				{ label: 'Launch', link: '/' },
				{ label: 'Learn More', link: '/' }
			]
		},
		{
			label: 'Skate.',
			actions: [
				{ label: 'Start', link: '/' },
				{ label: 'Explore', link: '/' }
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
							<a href="/">
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
