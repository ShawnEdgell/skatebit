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
			<h1>XL Hub</h1>
			<p>A new way to browse, download, and manage your Skater XL mods.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2>The Easy Way to Mod Skater XL</h2>
			<p>
				Introducing XL Hub by Fro, the ultimate tool for browsing, downloading, and managing your
				Skater XL maps and mods. No UnityModManager required.
			</p>
			<blockquote class="blockquote mb-4">
				Please note that you currently cannot install DawgVinci mods via XL Hub. You will need to
				manually download these from DawgVinci's Discord and install them manually. (XXL Mod, XL
				Mod, DeckFX Fix, etc.)
			</blockquote>
			<a href="https://mod.io/g/skaterxl/m/XLHub" target="_blank">Check Out XL Hub</a>
			<img src="/images/XLHub.webp" alt="XL Hub" class="rounded-xl my-6" />
		</div>
		<div>
			<h2>XL Hub Video Explanation</h2>
			<p>XL Hub information starts around 2:50 in the video down below.</p>
			<iframe
				class="h-full w-full mt-4"
				src="https://www.youtube.com/embed/b4yHXn0iOl0?si=LZYDdQ-E_Q9plX8B"
				title="Skater XL Will Never Be the Same Again"
				frameborder="0"
				allowfullscreen
				loading="lazy"
			/>
		</div>
	</article>
</div>
