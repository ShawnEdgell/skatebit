<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | Skate.</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-warning mb-2">Skate.</span>
			<h1>Skate: The Next Chapter</h1>
			<p>
				Get the latest scoop on the highly anticipated Skate. game – from early development insights
				to how you can join the journey.
			</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Stay Updated</h2>
			<p>
				For the latest news and updates on Skate. and more, make sure to visit our News section
				regularly!
			</p>
			<a href="/docs/news" class="btn" data-sveltekit-preload-data="hover">Latest News</a>
		</div>
		<div>
			<h2>Join the Playtesting Crew</h2>
			<p>
				Eager for a sneak peek and willing to lend your voice to shape Skate's future? Dive into the
				playtest sign-up below and be part of the game's development.
			</p>
			<a
				href="https://www.ea.com/games/skate/insider-playtest-registration"
				target="_blank"
				class="btn"
				data-sveltekit-preload-data="hover">Skate. Playtest Signup</a
			>
		</div>
		<div>
			<h2>Join the Community</h2>
			<p>
				Join the official Skate. Discord to chat with community memebers and stay updated on the
				latest news and updates.
			</p>
			<a
				href="https://discord.gg/skateea"
				target="_blank"
				class="btn"
				data-sveltekit-preload-data="hover">Skate. Discord</a
			>
		</div>
		<iframe
			class="h-full w-full"
			src="https://www.youtube.com/embed/Y2XddTE08rI?si=PHcksZ3Kry1jQOJ_"
			title="Still Working On It | skate."
			frameborder="0"
			allowfullscreen
			loading="lazy"
		/>
	</article>
</div>
