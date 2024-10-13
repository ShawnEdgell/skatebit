<script lang="ts">
	import { navItems } from '../constants/navItems';
</script>

<footer
	class="bg-surface-100-800-token text-base-content p-10 flex flex-col items-center w-full gap-6"
>
	<!-- Navigation links styled in grid layout -->
	<nav class="grid text-center md:grid-flow-col gap-4">
		{#each navItems as { href, label }}
			<a
				{href}
				class="hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
				data-sveltekit-preload-data="hover"
			>
				{label}
			</a>
		{/each}
	</nav>

	<!-- Social Media Icons Section -->
	<nav>
		<div class="grid grid-flow-col gap-4">
			<!-- YouTube Icon -->
			<a
				href="https://www.youtube.com/results?search_query=skater+xl"
				class="fill-current hover:text-primary"
				target="_blank"
				aria-label="YouTube"
			>
				<svg
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path
						d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
					></path>
				</svg>
			</a>
			<!-- Twitch Icon -->
			<a
				href="https://www.twitch.tv/search?term=skater%20xl"
				class="fill-current hover:text-primary"
				target="_blank"
				aria-label="Twitch"
			>
				<svg
					aria-hidden="true"
					class="w-6 h-6"
					viewBox="-0.5 0 20 20"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<title>twitch [#182]</title> <desc>Created with Sketch.</desc> <defs> </defs>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g
								id="Dribbble-Light-Preview"
								transform="translate(-141.000000, -7399.000000)"
								fill="currentColor"
							>
								<g id="icons" transform="translate(56.000000, 160.000000)">
									<path
										d="M97,7249 L99,7249 L99,7244 L97,7244 L97,7249 Z M92,7249 L94,7249 L94,7244 L92,7244 L92,7249 Z M102,7250.307 L102,7241 L88,7241 L88,7253 L92,7253 L92,7255.953 L94.56,7253 L99.34,7253 L102,7250.307 Z M98.907,7256 L94.993,7256 L92.387,7259 L90,7259 L90,7256 L85,7256 L85,7242.48 L86.3,7239 L104,7239 L104,7251.173 L98.907,7256 Z"
										id="twitch-[#182]"
									>
									</path>
								</g>
							</g>
						</g>
					</g></svg
				>
			</a>
		</div>
	</nav>

	<!-- Footer Text -->
	<p class="text-center">©2024 Skatebit</p>
</footer>
