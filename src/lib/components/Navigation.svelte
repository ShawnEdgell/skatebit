<script lang="ts">
	import { popup, LightSwitch } from '@skeletonlabs/skeleton';
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
			d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592c.86 0 1.319 1.012.753 1.658l-4.796 5.482a.5.5 0 0 1-.506.0z"
		/>
	</svg>
</button>

<!-- Corresponding Popup -->
<div class="card p-4 z-1000" data-popup="popup-0">
	<div class="popup-content space-y-1">
		<nav class="list-nav">
			<ul>
				<li>
					<a href="/" data-sveltekit-preload-data="hover">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Homepage</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/docs/introduction" data-sveltekit-preload-data="hover">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Documentation</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/docs/news" data-sveltekit-preload-data="hover">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">News</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/skaterxl/news" data-sveltekit-preload-data="hover">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Skater XL</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/session/news" data-sveltekit-preload-data="hover">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Session</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/skate/news" data-sveltekit-preload-data="hover">
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

<button
	class="btn hover:bg-primary-500/10 flex items-center space-x-1 relative"
	use:popup={{ ...popupSettings, target: `popup-1` }}
>
	<span>
		<p class="hidden md:block">Settings</p>
		<svg class="w-6 block md:hidden" viewBox="0 0 24 24" fill="none">
			<path
				d="M18.763 13.7944L20.029 16.0222C19.8786 16.3163 19.7105 16.6051 19.5244 16.8873C19.3383 17.1695 19.1391 17.4378 18.9281 17.6919L16.4377 17.4142C15.7715 17.9608 15.0027 18.3869 14.1645 18.6592L13.0002 20.945C12.6719 20.9813 12.3382 21 12.0002 21C11.6622 21 11.3285 20.9813 11.0002 20.945L9.83293 18.6582C8.99428 18.3854 8.22514 17.9585 7.5589 17.4111L5.05407 17.6915C4.84303 17.4374 4.64381 17.1691 4.45774 16.8869C4.27168 16.6047 4.10356 16.3159 3.95312 16.0218L5.22637 13.7814C5.07803 13.2142 5.00021 12.6139 5.00021 12.0002C5.00021 11.3749 5.08219 10.7688 5.23599 10.192L3.95351 7.936C4.10394 7.64191 4.27206 7.3531 4.45812 7.07091C4.64419 6.78873 4.84341 6.52043 5.05445 6.2663L7.60942 6.55327C8.26776 6.02075 9.01625 5.60683 9.84 5.33984M9.83614 5.33996L11 3.05493C11.3283 3.01863 11.662 3 12 3C12.338 3 12.6716 3.01863 13 3.05493L14.1638 5.33996C14.9882 5.60716 15.7389 6.01764 16.3976 6.55077L18.9275 6.26661C19.1385 6.52074 19.3377 6.78904 19.5238 7.07123C19.7098 7.35341 19.878 7.64223 20.0284 7.93632L18.7592 10.1697M18.7594 10.1732C18.9164 10.7556 19.0002 11.3681 19.0002 12.0002C19.0002 12.6215 18.9193 13.2239 18.7673 13.7974M15.0002 12.0002C15.0002 13.657 13.6571 15.0002 12.0002 15.0002C10.3433 15.0002 9.0002 13.657 9.0002 12.0002C9.0002 10.3433 10.3433 9.00015 12.0002 9.00015C13.6571 9.00015 15.0002 10.3433 15.0002 12.0002Z"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</span>
	<svg class="w-4" viewBox="0 0 16 16" fill="currentColor" style="position: relative; top: 2px;">
		<path
			d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592c.86 0 1.319 1.012.753 1.658l-4.796 5.482a.5.5 0 0 1-.506.0z"
		/>
	</svg>
</button>

<!-- Corresponding Popup -->
<div class="card p-4 z-1000" data-popup="popup-1">
	<div class="popup-content space-y-1">
		<nav class="list-nav">
			<ul>
				<li>
					<a href="/login" data-sveltekit-preload-data="hover">
						<div>
							<span class="badge bg-primary-500">(icon)</span>
							<span class="flex-auto">Account</span>
						</div>
					</a>
				</li>
				<div class="py-2">
					<hr class="!border-t-2" />
				</div>
				<div class="flex items-center justify-between">
					<h3>Mode</h3>
					<LightSwitch />
				</div>
			</ul>
		</nav>
	</div>
</div>

<a
	href="https://discord.gg/uDkSEBKdga"
	target="_blank"
	class="btn hover:bg-primary-500/10 rounded-full p-2 inline-flex items-center justify-center"
>
	<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
		<path
			d="M18.59 5.88997C17.36 5.31997 16.05 4.89997 14.67 4.65997C14.5 4.95997 14.3 5.36997 14.17 5.69997C12.71 5.47997 11.26 5.47997 9.83001 5.69997C9.69001 5.36997 9.49001 4.95997 9.32001 4.65997C7.94001 4.89997 6.63001 5.31997 5.40001 5.88997C2.92001 9.62997 2.25001 13.28 2.58001 16.87C4.23001 18.1 5.82001 18.84 7.39001 19.33C7.78001 18.8 8.12001 18.23 8.42001 17.64C7.85001 17.43 7.31001 17.16 6.80001 16.85C6.94001 16.75 7.07001 16.64 7.20001 16.54C10.33 18 13.72 18 16.81 16.54C16.94 16.65 17.07 16.75 17.21 16.85C16.7 17.16 16.15 17.42 15.59 17.64C15.89 18.23 16.23 18.8 16.62 19.33C18.19 18.84 19.79 18.1 21.43 16.87C21.82 12.7 20.76 9.08997 18.61 5.88997H18.59ZM8.84001 14.67C7.90001 14.67 7.13001 13.8 7.13001 12.73C7.13001 11.66 7.88001 10.79 8.84001 10.79C9.80001 10.79 10.56 11.66 10.55 12.73C10.55 13.79 9.80001 14.67 8.84001 14.67ZM15.15 14.67C14.21 14.67 13.44 13.8 13.44 12.73C13.44 11.66 14.19 10.79 15.15 10.79C16.11 10.79 16.87 11.66 16.86 12.73C16.86 13.79 16.11 14.67 15.15 14.67Z"
			fill="currentColor"
		/>
	</svg>
</a>
