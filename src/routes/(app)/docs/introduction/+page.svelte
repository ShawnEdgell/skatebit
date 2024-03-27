<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import Cards from './Cards.svelte';
</script>

<svelte:head>
	<title>Skatebit | Introduction</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled mb-2">Docs</span>
			<h1>Introduction</h1>
			<p>A short introduction.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>About Skatebit.</h2>

			<p>
				Skatebit is your ultimate destination for all things related to skateboarding video games.
			</p>
			<p>
				We've created a comprehensive platform where skateboarding enthusiasts can come together to
				exchange tips, find guides, download community stats and settings, and engage in
				discussions.
			</p>
		</div>
		<div>
			<h2>Forums</h2>
			<!-- Container for articles to control spacing -->
			<p>
				Dive into discussions, share tips and tricks, and connect with other skateboarding
				enthusiasts from around the world.
			</p>
			<a href="/forums" data-sveltekit-preload-data="hover"> Explore Forums </a>
		</div>
		<div>
			<h2>Blog</h2>
			<!-- Container for articles to control spacing -->
			<p>
				Explore the latest updates, insights, and stories in the Skatebit blog. From interviews with
				pro skaters to behind-the-scenes looks at game development, our blog offers a diverse range
				of content to keep you informed and entertained.
			</p>
			<a href="/blog" data-sveltekit-preload-data="hover"> Explore Blog </a>
		</div>
		<div>
			<h2>Games</h2>
			<!-- Container for articles to control spacing -->
			<p>
				Stay updated with the latest news, stats, settings, and guides for your favorite
				skateboarding video games.
			</p>
		</div>
		<Cards />
	</article>
</div>
