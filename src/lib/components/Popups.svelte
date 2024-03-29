<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	// Common settings for the popup, without 'target'
	let popupSettings: Omit<PopupSettings, 'target'> = {
		event: 'click',
		placement: 'bottom',
		middleware: { offset: 8 }
	};
</script>

<button
	class="btn hover:bg-primary-500/10 hidden md:flex items-center space-x-1 relative"
	use:popup={{ ...popupSettings, target: `popup-0` }}
>
	<span>Explore</span>
	<svg class="w-4" viewBox="0 0 16 16" fill="currentColor" style="position: relative; top: 2px;">
		<path
			d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592c.86 0 1.319 1.012.753 1.658l-4.796 5.562a.5.5 0 0 1-.506.0z"
		/>
	</svg>
</button>

<!-- Corresponding Popup -->
<div class="card p-4 z-1000" data-popup="popup-0">
	<div class="popup-content space-y-1">
		<nav class="list-nav">
			<ul>
				<li>
					<a href="/" class="w-56">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Homepage</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/skaterxl/news" class="w-56">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Documentation</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/skaterxl/news" class="w-56">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Skater XL</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/session/news" class="w-56">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Session</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/skate/news" class="w-56">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Skate.</span>
						</div>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>
