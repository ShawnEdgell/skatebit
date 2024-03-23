<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | Skater XL News</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }} class="max-w-4xl mx-auto">
	<h1 class="text-3xl font-bold mb-8">Skater XL News</h1>

	<article class="mb-12">
		<h2 class="text-xl font-semibold mb-2">Now Available On Nintendo Switch</h2>
		<p class="text-surface-600-300-token mb-4">March 15, 2024</p>
		<p class="mb-4">
			Skater XL has just dropped into the Nintendo Switch eShop, bringing all its skateboarding
			glory to your on-the-go gaming sessions. Smooth as butter at 60 FPS whether you're playing
			handheld or docked, Skater XL packs in the full experience. With its physics-based gameplay,
			you can join freeskate multiplayer sessions with up to 10 players, mess around with the replay
			editor, and play as skate legends like Tiago Lemos, Brandon Westgate, Tom Asta, and Evan
			Smith. Plus, you'll find gear from over 30 legit skate brands and plenty more to keep you
			shredding in style.
		</p>
		<div class="aspect-video w-full">
			<iframe
				src="https://www.youtube.com/embed/r6_wjWiXpx8"
				title="Skater XL Nintendo Switch Launch Trailer"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</article>
	<article class="mb-12">
		<h2 class="text-xl font-semibold mb-2">Grabs Update On All Platforms</h2>
		<p class="text-surface-600-300-token mb-4">August 30, 2023</p>
		<p class="mb-4">
			More freedom with grabs is now available on PlayStation, Xbox, and in the public branch on
			Steam. An expansion of freedom and control in Skater XL’s core gameplay, the update has just
			been released on consoles which makes some changes and additions to the grab mechanic.
		</p>
		<div class="aspect-video w-full">
			<iframe
				src="https://www.youtube.com/embed/tRuprTKtJOo"
				title="Skater XL Grabs Update On All Platforms"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>
	</article>
	<article class="mb-12">
		<h2 class="text-xl font-semibold mb-2">Some new things brewing for 2023...</h2>
		<p class="text-surface-600-300-token mb-4">August 30, 2023</p>
		<p class="mb-4">
			Take a look at Skater XL's announcement trailer for some exciting features that were promised
			for 2023. As of 2024, they haven't been released yet. But hey, in the meantime, they did roll
			out an update that tweaks the grab mechanics for a better feel on PlayStation, Xbox, and
			Steam. It's a nice touch, giving players a bit more control and fun. Keep an eye out for those
			new features; they've got to drop sometime, right?
		</p>
		<div class="aspect-video w-full">
			<iframe
				src="https://www.youtube.com/embed/zIUTsIKBa_o"
				title="Skater XL - Some new things brewing for 2023..."
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		</div>
	</article>

	<!-- Repeat for other news items -->
</div>
