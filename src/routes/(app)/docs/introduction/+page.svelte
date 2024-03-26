<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import Cards from './Cards.svelte';
</script>

<svelte:head>
	<title>Skatebit | Introduction</title>
</svelte:head>

<div
	use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}
	class="max-w-4xl space-y-5 mx-auto"
>
	<div class="space-y-12">
		<div>
			<span class="badge variant-filled mb-2">Docs</span>
			<h1 class="text-3xl font-bold mb-8">Introduction</h1>
			<h2 class="text-xl font-semibold mb-2">About Skatebit.</h2>
			<!-- Container for articles to control spacing -->
			<p class="mb-4">
				Skatebit is your ultimate destination for all things related to skateboarding video games.
			</p>
			<p class="mb-4">
				We've created a comprehensive platform where skateboarding enthusiasts can come together to
				exchange tips, find guides, download community stats and settings, and engage in
				discussions.
			</p>
		</div>
		<div>
			<h2 class="text-xl font-semibold mb-2">Forums</h2>
			<!-- Container for articles to control spacing -->
			<p class="mb-4">
				Dive into discussions, share tips and tricks, and connect with other skateboarding
				enthusiasts from around the world.
			</p>
			<a href="/forums" class="btn variant-filled-secondary" data-sveltekit-preload-data="hover">
				Explore Forums
			</a>
		</div>
		<div>
			<h2 class="text-xl font-semibold mb-2">Blog</h2>
			<!-- Container for articles to control spacing -->
			<p class="mb-4">
				Explore the latest updates, insights, and stories in the Skatebit blog. From interviews with
				pro skaters to behind-the-scenes looks at game development, our blog offers a diverse range
				of content to keep you informed and entertained.
			</p>
			<a href="/blog" class="btn variant-filled-secondary" data-sveltekit-preload-data="hover">
				Explore Blog
			</a>
		</div>

		<div>
			<h2 class="text-xl font-semibold mb-2">Games</h2>
			<!-- Container for articles to control spacing -->
			<p class="mb-4">
				Stay updated with the latest news, stats, settings, and guides for your favorite
				skateboarding video games.
			</p>
			<Cards />
		</div>
	</div>
</div>
