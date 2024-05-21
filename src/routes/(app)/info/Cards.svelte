<script lang="ts">
	const games = [
		{
			title: 'Skater XL',
			releaseDate: 'July 28, 2020',
			description:
				"Skater XL revolutionizes skateboarding gameplay with its Independent Foot Control System and physics-based mechanics, offering gamers the expressive controls they've always dreamed of.",
			imageSrc: '/images/Alpha2.webp',
			href: '/skaterxl/about'
		},
		{
			title: 'Session: Skate Sim',
			releaseDate: 'September 22, 2022',
			description:
				"Session is an ultra-realistic skateboard game blending '90s skate culture aesthetic with modern dual stick controls for total board and skater control.",
			imageSrc: '/images/Session.webp',
			href: '/session/about'
		},
		{
			title: 'Skate.',
			releaseDate: 'TBA',
			description:
				"Skate. is EA's upcoming skateboarding game, promising a return to the beloved franchise with a renewed focus on authenticity and innovative gameplay mechanics.",
			imageSrc: '/images/Skate.webp',
			href: '/skate/about'
		},
		{
			title: 'BMX Streets',
			releaseDate: 'April 5, 2024',
			description:
				'BMX Streets is a next-gen BMX game that offers a realistic experience with a focus on physics and control.',
			imageSrc: '/images/BMX_Reshade2.webp',
			href: '/bmxstreets/about'
		}
	];
</script>

<div class="grid lg:grid-cols-2 gap-4">
	{#each games as game (game.title)}
		<div class="card flex flex-col items-center">
			<!-- Image with fixed size -->
			<div class="w-full rounded-xl h-64 bg-gray-200 overflow-hidden">
				<img src={game.imageSrc} alt={game.title} class="w-full h-full object-cover" />
			</div>
			<!-- Text content -->
			<div class="flex-1 p-4">
				<header class="card-header p-0">
					<h3 class="h3">{game.title}</h3>
				</header>
				<section class="py-2">Release Date: {game.releaseDate}</section>
				<footer class="card-footer flex flex-col gap-4 p-0">
					{game.description}
					<div>
						<a href={game.href} class="btn variant-filled-secondary mb-2">Explore {game.title}</a>
					</div>
				</footer>
			</div>
		</div>
	{/each}
</div>
