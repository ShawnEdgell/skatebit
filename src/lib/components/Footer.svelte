<script lang="ts">
	import { navItems } from '$lib/data/navItems';
	import YouTubeSVG from '$lib/icons/YouTubeSVG.svelte';
	import TwitchSVG from '$lib/icons/TwitchSVG.svelte';
</script>

<footer class="footer footer-center bg-base-300 flex flex-col p-10">
	<nav class="grid gap-4 text-center md:auto-cols-auto md:grid-flow-col">
		{#each navItems as { href, label }}
			<a {href} class="underline hover:no-underline">
				<span>{label}</span>
			</a>
		{/each}
	</nav>

	<nav>
		<div class="flex justify-center gap-4 md:grid md:grid-flow-col">
			<a aria-label="YouTube" href="https://www.youtube.com/@SkaterXL" target="_blank">
				<YouTubeSVG />
			</a>
			<a
				aria-label="Twitch"
				href="https://www.twitch.tv/directory/category/skater-xl"
				target="_blank"
			>
				<TwitchSVG />
			</a>
		</div>
	</nav>

	<aside class="text-center">
		<p>Skatebit {new Date().getFullYear()} - The Skater XL Modding Community</p>
	</aside>
</footer>
