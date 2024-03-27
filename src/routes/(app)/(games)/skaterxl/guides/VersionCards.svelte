<script lang="ts">
	const cards = [
		{
			imageSrc: '/images/Alpha2.webp',
			title: 'Skater XL v1.2.2.8 (Alpha)',
			description:
				'Unparalleled mod support in Skater XL 1.2.2.8 empowers players to explore a vast modding universe, featuring essential mods like the XXL 3 mod and XL Gear Modifier.'
		},
		{
			imageSrc: '/images/Home2.webp',
			title: 'Skater XL v1.2.7.8 (Public)',
			description:
				"Vert skating gets a revolutionary makeover in v1.2.7.8 with an advanced grabs update. It's a dream come true for ramp and bowl lovers seeking depth and realism in their skateboarding exploits."
		}
	];
</script>

<h2>Choosing Your Game Version</h2>
<p>
	Different versions of Skater XL come with their own set of unique mods. Find out below what's
	special about each one.
</p>
<div class="flex gap-4 mb-8">
	{#each cards as card (card.title)}
		<div class="card p-0 mt-4 mb-4">
			<img src={card.imageSrc} alt={card.title} class="rounded-lg" />
			<p class="p-4">
				<strong>{card.title}</strong>
				<br />
				<span class="text-sm">{card.description}</span>
			</p>
		</div>
	{/each}
</div>
