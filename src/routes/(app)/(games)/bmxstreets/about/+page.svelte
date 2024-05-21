<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | BMX Streets</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-surface mb-2">BMX Streets</span>
			<h1>BMX Streets: The Next-Gen BMX Game</h1>
			<p>Catch all the latest buzz on BMX Streets, the eagerly awaited sequel to Pipe.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Stay in the Loop</h2>
			<p>
				Keep up with the freshest news and updates on BMX Streets and more, by checking out the News
				section frequently!
			</p>
			<a href="/news" class="btn" data-sveltekit-preload-data="hover">Latest News</a>
		</div>
		<div>
			<h2>Join the Community</h2>
			<p>
				Become part of the BMX Streets family by joining the official Discord. Chat with fellow
				enthusiasts and stay up-to-date with the latest developments.
			</p>
			<a
				href="https://discord.gg/uEB8km4Dem"
				target="_blank"
				class="btn"
				data-sveltekit-preload-data="hover">BMX Streets Discord</a
			>
		</div>
		<div>
			<h2>Start Your Modding Journey</h2>
			<p>Check out the Volution Discord to stay updated with the latest mods for BMX Streets.</p>
			<a
				href="https://discord.com/invite/mgWRUnD"
				target="_blank"
				class="btn"
				data-sveltekit-preload-data="hover">Volution Discord</a
			>
		</div>
		<div>
			<h2>BMX: Streets Modding Website</h2>
			<p>
				The official BMXS Modding Website is the go-to spot for downloading and sharing mods, maps,
				and more.
			</p>
			<a href="https://mod.io/g/bmxs" target="_blank" class="btn">mod.io</a>
		</div>
		<h2>Launch Trailer</h2>
		<iframe
			class="h-full w-full mt-4"
			src="https://www.youtube.com/embed/Q_c6XMMKTS4?si=JMmF1uku40XTgW1l"
			title="Behind the Scenes | BMX Streets"
			frameborder="0"
			allowfullscreen
			loading="lazy"
		/>
	</article>
</div>
