<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import Mods from './Mods.svelte';
</script>

<svelte:head>
	<title>Skatebit | BMX Streets</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-surface mb-2">BMX Streets</span>
			<h1>Mods</h1>
			<p>Discover all the best mods for BMX Streets.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>Volution Discord</h2>
			<p>
				Make sure to join the Volution Discord server to stay up to date with the latest mods and
				updates. This is the go-to spot for all your BMX Streets modding needs.
			</p>
			<a
				href="https://discord.com/invite/mgWRUnD"
				target="_blank"
				class="btn"
				data-sveltekit-preload-data="hover">Volution Discord</a
			>
		</div>
		<div>
			<h2>mod.io</h2>
			<p>
				Check out mod.io for the latest BMX Streets mods, maps, and more. This is where you will
				download most of your script mods, maps, and more.
			</p>
			<a
				href="https://mod.io/g/bmxs"
				target="_blank"
				class="btn"
				data-sveltekit-preload-data="hover">mod.io</a
			>
		</div>
		<!-- <div>
			<h2>Mod List</h2>
			<p>
				Here you can find a list of all working script mods. Make sure your have Melon Loader
				downloaded and installed first, then simply drop these mods into your Mods folder.
			</p>
			<Mods />
		</div> -->
	</article>
</div>
