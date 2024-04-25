<script lang="ts">
	const games = [
		{
			title: 'Skater XL',
			releaseDate: 'July 28, 2020',
			imageSrc: '/images/Alpha2.webp',
			href: '/skaterxl/about'
		},
		{
			title: 'Session: Skate Sim',
			releaseDate: 'September 22, 2022',
			imageSrc: '/images/Session.webp',
			href: '/session/about'
		},
		{
			title: 'Skate.',
			releaseDate: 'TBA',
			imageSrc: '/images/Skate.webp',
			href: '/skate/about'
		},
		{
			title: 'BMX Streets',
			releaseDate: 'April 5, 2024',
			imageSrc: '/images/bmx.webp',
			href: '/bmxstreets/about'
		}
	];
</script>

<div class="grid md:grid-cols-4 grid-cols-2 gap-4">
	{#each games as game (game.title)}
		<a href={game.href} class="block card card-hover overflow-hidden">
			<div class="relative w-full pb-[100%]">
				<!-- Ensuring a square aspect ratio -->
				<img
					src={game.imageSrc}
					loading="lazy"
					alt={game.title}
					class="absolute top-0 left-0 w-full h-full object-cover"
				/>
			</div>
			<header class="text-center font-bold p-4">
				{game.title}
			</header>
		</a>
	{/each}
</div>
