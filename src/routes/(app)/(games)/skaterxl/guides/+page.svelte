<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
	import QuickGuide from './QuickGuide.svelte';
	import MapsGear from './MapsGear.svelte';
	import VideoSection from './VideoSection.svelte';
	import VersionCards from './VersionCards.svelte';
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
			<h1>Guides</h1>
			<p>Learn how to get started with Skater XL modding.</p>
			<hr class="!border-t-2" />
		</div>
		<VersionCards />
		<div>
			<h2>Getting Started with Skater XL Modding</h2>
			<p>
				Begin your Skater XL modding journey with our getting started guide. This guide will walk
				you through the essential steps to get you up and running with all the latest mods.
			</p>
			<div class="card p-6 mb-12">
				<QuickGuide />
			</div>
		</div>
		<div>
			<h2>Maps & Gear</h2>
			<p>
				Explore maps and gear to enhance your Skater XL experience. Discover new environments and
				equipment to take your skills to the next level.
			</p>
			<div class="card p-6 mb-12">
				<MapsGear />
			</div>
		</div>
		<VideoSection
			title="Skater XL Mod Guide (2024)"
			description="This video will explain how to add script mods into any version of Skater XL."
			src="https://www.youtube.com/embed/veZlQE7tfHw?si=kPmg9iWUzPqQlPPO"
			videoTitle="Skater XL Mod Guide (2024)"
		/>

		<VideoSection
			title="XXL 3 Mod - Getting Started"
			description="This video will run you through the basics of the XXL 3 Mod."
			src="https://www.youtube.com/embed/BgJ1Pxa23fE?si=7qZQQ67fDGf-lq_P"
			videoTitle="XXL 3 Mod - Getting Started"
		/>

		<VideoSection
			title="XL Gear Modifier - Getting Started"
			description="This video will run you through the basics of the XLGM 2 Mod."
			src="https://www.youtube.com/embed/FgBUi8X5th0?si=BqdqOhiadz2hHjkK"
			videoTitle="XL Gear Modifier - Getting Started"
		/>

		<VideoSection
			title="XL Graphics - Getting Started"
			description="This video will run you through the basics of the XL Graphics Mod."
			src="https://www.youtube.com/embed/5U-OL4O4Kmk?si=yKcngMTogKQh-mHg"
			videoTitle="XL Graphics - Getting Started"
		/>

		<VideoSection
			title="Boned Ollie Mod - Getting Started"
			description="This video will run you through the basics of the Boned Ollie Mod."
			src="https://www.youtube.com/embed/CedYPAYrnkE?si=NF2M54iO9p4T2IHR"
			videoTitle="Boned Ollie Mod - Getting Started"
		/>

		<!-- Repeat for other videos as needed -->
	</article>
</div>
