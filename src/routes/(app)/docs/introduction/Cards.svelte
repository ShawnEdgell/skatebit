<script lang="ts">
	const games = [
		{
			title: 'Skater XL',
			releaseDate: 'July 28, 2020',
			description:
				"Skater XL revolutionizes skateboarding gameplay with its Independent Foot Control System and physics-based mechanics, offering gamers the expressive controls they've always dreamed of.",
			imageSrc: '/images/Home2.webp'
		},
		{
			title: 'Session: Skate Sim',
			releaseDate: 'September 22, 2022',
			description:
				"Session is an ultra-realistic skateboard game blending '90s skate culture aesthetic with modern dual stick controls for total board and skater control.",
			imageSrc: '/images/Picture.webp'
		},
		{
			title: 'Skate.',
			releaseDate: 'TBA',
			description:
				"Skate. is EA's upcoming skateboarding game, promising a return to the beloved franchise with a renewed focus on authenticity and innovative gameplay mechanics.",
			imageSrc: '/images/Picture.webp'
		}
	];
</script>

<div class="flex flex-col gap-2">
	{#each games as game (game.title)}
		<div class="card flex justify-center items-center">
			<!-- Text content -->
			<div class="flex-1">
				<header class="card-header">
					<h2 class="h2 text-2xl">{game.title}</h2>
				</header>
				<section class="p-4">Release Date: {game.releaseDate}</section>
				<footer class="card-footer">{game.description}</footer>
			</div>
			<!-- Circular image -->
			<div class="rounded-full overflow-hidden w-36 h-36 m-4">
				<img src={game.imageSrc} alt={game.title} class="object-cover w-full h-full" />
			</div>
		</div>
	{/each}
</div>
