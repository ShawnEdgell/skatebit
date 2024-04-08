<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
			<h1>Skater XL: The Ultimate Skateboarding Experience</h1>
			<p>
				Dive into the world of Skater XL, known for its awesome modding scene and endless
				possibilities.
			</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Stay Updated</h2>
			<p>
				For the latest news and updates on Skater XL and more, make sure to visit our News section
				regularly!
			</p>
			<a href="/docs/news" class="btn" data-sveltekit-preload-data="hover">Latest News</a>
		</div>
		<div>
			<h2>Join the Community</h2>
			<p>Eager to dive into the Skater XL community? Join the Skater XL Modding Discord below!</p>
			<a href="https://discord.gg/uDkSEBKdga" target="_blank" class="btn">Join Discord</a>
		</div>
		<div>
			<h2>Skater Modding Website</h2>
			<p>
				The official Skater XL Modding Website is the go-to spot for downloading and sharing Skater
				XL mods, maps, gear, and more.
			</p>
			<a href="https://mod.io/g/skaterxl" target="_blank" class="btn">skaterxl.mod.io</a>
		</div>
		<iframe
			class="h-full w-full"
			src="https://www.youtube.com/embed/gAlA20YBaNQ?si=L91DIgBOlJvY2cm-"
			title="Skater XL - Official Multiplayer Launch Trailer"
			frameborder="0"
			allowfullscreen
			loading="lazy"
		/>
	</article>
</div>
