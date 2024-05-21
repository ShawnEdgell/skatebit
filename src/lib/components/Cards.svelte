<script lang="ts">
	const games = [
		{
			title: 'Skater XL',
			releaseDate: 'July 28, 2020',
			imageSrc: '/images/cover-xl.webp',
			href: '/skaterxl/about'
		},
		{
			title: 'Session: Skate Sim',
			releaseDate: 'September 22, 2022',
			imageSrc: '/images/cover-session.webp',
			href: '/session/about'
		},
		{
			title: 'Skate.',
			releaseDate: 'TBA',
			imageSrc: '/images/cover-skate.webp',
			href: '/skate/about'
		},
		{
			title: 'BMX Streets',
			releaseDate: 'April 5, 2024',
			imageSrc: '/images/cover-streets.webp',
			href: '/bmxstreets/about'
		}
	];
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-2">
	{#each games as game (game.title)}
		<a href={game.href} class="block card card-hover rounded-xl overflow-hidden">
			<div class="relative w-full pb-[100%]">
				<!-- Ensuring a square aspect ratio -->
				<img
					src={game.imageSrc}
					loading="lazy"
					alt={game.title}
					class="absolute top-0 left-0 w-full h-full object-cover"
				/>
			</div>
		</a>
	{/each}
</div>
