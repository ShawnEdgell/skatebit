<script lang="ts">
	import { tocCrawler } from '@skeletonlabs/skeleton';
</script>

<svelte:head>
	<title>Skatebit | Introduction</title>
</svelte:head>

<div
	use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}
	class="max-w-4xl space-y-5 mx-auto"
>
	<div>
		<h1 class="text-3xl font-bold mb-8">Introduction</h1>
		<h2 class="text-xl font-semibold mb-2">About Skatebit.</h2>
		<!-- Container for articles to control spacing -->
		<p class="mb-4">
			Skatebit is your ultimate destination for all things related to skateboarding video games.
		</p>
		<p class="mb-4">
			We've created a comprehensive platform where skateboarding enthusiasts can come together to
			exchange tips, find guides, download community stats and settings, and engage in discussions.
		</p>
	</div>
	<div class="flex flex-col gap-2">
		<div class="card flex justify-center items-center">
			<!-- Text content -->
			<div class="flex-1">
				<header class="card-header">
					<h2 class="h2 text-2xl">Skater XL</h2>
				</header>
				<section class="p-4">Release Date: July 28, 2020</section>
				<footer class="card-footer">
					Skater XL revolutionizes skateboarding gameplay with its Independent Foot Control System
					and physics-based mechanics, offering gamers the expressive controls they've always
					dreamed of.
				</footer>
			</div>
			<!-- Circular image -->
			<div class="rounded-full overflow-hidden w-36 h-36 m-4">
				<img src="/images/Home2.webp" alt="Skater XL" class="object-cover w-full h-full" />
			</div>
		</div>

		<div class="card flex justify-center items-center">
			<!-- Text content -->
			<div class="flex-1">
				<header class="card-header">
					<h2 class="h2 text-2xl">Session: Skate Sim</h2>
				</header>
				<section class="p-4">Release Date: September 22, 2022</section>
				<footer class="card-footer">
					Session is an ultra-realistic skateboard game blending '90s skate culture aesthetic with
					modern dual stick controls for total board and skater control.
				</footer>
			</div>
			<!-- Circular image -->
			<div class="rounded-full overflow-hidden w-36 h-36 m-4">
				<img src="/images/Picture.webp" alt="Session" class="object-cover w-full h-full" />
			</div>
		</div>

		<div class="card flex justify-center items-center">
			<!-- Text content -->
			<div class="flex-1">
				<header class="card-header">
					<h2 class="h2 text-2xl">Skate.</h2>
				</header>
				<section class="p-4">Release Date: TBA</section>
				<footer class="card-footer">
					Skate. is EA's upcoming skateboarding game, promising a return to the beloved franchise
					with a renewed focus on authenticity and innovative gameplay mechanics.
				</footer>
			</div>
			<!-- Circular image -->
			<div class="rounded-full overflow-hidden w-36 h-36 m-4">
				<img src="/images/Picture.webp" alt="Skate." class="object-cover w-full h-full" />
			</div>
		</div>
	</div>
</div>
