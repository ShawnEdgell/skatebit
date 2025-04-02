<script lang="ts">
	import { navItems } from '$lib/data/navItems';
</script>

<footer class="footer footer-center bg-base-300 flex flex-col p-16">
	<nav class="flex flex-wrap justify-center gap-4 text-center">
		{#each navItems as { href, label }}
			<a {href} class="underline hover:no-underline">{label}</a>
		{/each}
	</nav>

	<nav class="mt-4">
		<div class="flex justify-center gap-4 md:grid md:grid-flow-col">
			<a aria-label="YouTube" href="https://www.youtube.com/@SkaterXL" target="_blank">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="fill-current"
				>
					<path
						d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
					></path>
				</svg>
			</a>
			<a
				aria-label="Twitch"
				href="https://www.twitch.tv/directory/category/skater-xl"
				target="_blank"
			>
				<svg
					class="fill-current"
					width="24"
					height="24"
					viewBox="0 0 256 256"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M208,32H48A16.01833,16.01833,0,0,0,32,48V192a16.01833,16.01833,0,0,0,16,16H64v32a7.99949,7.99949,0,0,0,13.12109,6.14551L122.89648,208h42.207a16.03033,16.03033,0,0,0,10.24316-3.709l42.896-35.7461A15.958,15.958,0,0,0,224,156.253V48A16.01833,16.01833,0,0,0,208,32ZM128,136a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"
					></path>
				</svg>
			</a>
		</div>
	</nav>
</footer>

<footer class="footer footer-center bg-neutral p-16">
	<aside class="text-center text-xs">
		<p>Skatebit {new Date().getFullYear()} - The Skater XL Modding Community</p>
	</aside>
</footer>
