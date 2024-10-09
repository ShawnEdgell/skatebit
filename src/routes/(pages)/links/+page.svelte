<script lang="ts">
	// Define the structure for Discord server information
	interface DiscordServer {
		name: string;
		link: string;
		owner: string;
	}

	const modderDiscords: DiscordServer[] = [
		{
			name: 'Skater XL Modding Discord',
			link: 'https://discord.gg/uDkSEBKdga',
			owner: 'Brookzee99'
		},
		{ name: "DawgVinci's Discord", link: 'https://discord.gg/GmuBn6UzUh', owner: 'DawgVinci' },
		{ name: "Fro's Discord", link: 'https://discord.gg/6575k57jbk', owner: 'Froquede' },
		{ name: "Guru's Discord", link: 'https://discord.gg/bYK5w53Jg6', owner: 'Guru' }
	];

	// Define the arrays for other categories with an explicit type
	const mapDiscords = [
		{ name: "Aaronb543's Discord", link: 'https://discord.gg/FfF6aFs4MX', owner: 'Aaronb543' },
		{ name: "B-Row's Discord", link: 'https://discord.gg/DVcJEhPh8M', owner: 'B-Row' },
		{ name: "BigCat's Discord", link: 'https://discord.gg/qkvAMhrswY', owner: 'BigCat' },
		{ name: "Bralunit's Discord", link: 'https://discord.gg/RZbYQjxHdW', owner: 'Bralunit' },
		{ name: "Brookzee99's Discord", link: 'https://discord.gg/b9Dv9atMtZ', owner: 'Brookzee99' },
		{ name: "Doog's Discord", link: 'https://discord.gg/YfadSmDM5J', owner: 'Doog' },
		{
			name: "ElixirDubstep's Discord",
			link: 'https://discord.gg/CnvsyAZ3Dy',
			owner: 'ElixirDubstep'
		},
		{ name: "HeadShopper's Discord", link: 'https://discord.gg/5WsUkXE5Xd', owner: 'HeadShopper' },
		{ name: "Jean-Olive's Discord", link: 'https://discord.gg/PZrYPwBW8P', owner: 'Jean-Olive' },
		{ name: "Koannyc's Discord", link: 'https://discord.gg/A6Xm7jzYgT', owner: 'Koannyc' },
		{ name: "S4shko's Discord", link: 'https://discord.gg/RuyygKEZzy', owner: 'S4shko' },
		{ name: "ValidusTM's Discord", link: 'https://discord.gg/q3ScY7V8rr', owner: 'ValidusTM' },
		{ name: "Whynot_J's Discord", link: 'https://discord.gg/H5r9PU6zj7', owner: 'Whynot_J' }
	];

	const gearDiscords = [
		{ name: 'Antikz Discord', link: 'https://discord.gg/pHQWsYG5Mm', owner: 'Antikz' },
		{
			name: "ClutchDidThat's Discord",
			link: 'https://discord.gg/xQMXhCKfQ2',
			owner: 'ClutchDidThat'
		},
		{ name: "Hanzo's Discord", link: 'https://discord.gg/WaAKnSw6Ha', owner: 'Hanzo' },
		{ name: "Kurbdogg420's Discord", link: 'https://discord.gg/EUkY43zSWd', owner: 'Kurbdogg420' },
		{ name: 'Makes Discord', link: 'https://discord.gg/47pyuCNuxG', owner: 'Make' },
		{
			name: "Merlon Warlock's Discord",
			link: 'https://discord.gg/dpXEKGSVxw',
			owner: 'Merlon Warlock'
		},
		{ name: "Speekeek's Discord", link: 'https://discord.gg/XHfcp258rv', owner: 'Speekeek' },
		{ name: "Stevyy's Discord", link: 'https://discord.gg/9EzS82SNqG', owner: 'Stevyy' },
		{ name: 'Sungodpxllz Discord', link: 'https://discord.gg/cUnwY8ZZej', owner: 'Sungodpxllz' }
	];

	// Aggregate the categories in an array
	const categories = [
		{
			title: 'Modder Discords',
			data: modderDiscords,
			description:
				'Connect with the creative minds behind your favorite mods. These Discord communities are hubs for developers and users to share tips, mods, and tutorials.'
		},
		{
			title: 'Map Discords',
			data: mapDiscords,
			description:
				'Discover new maps and connect with map creators. These Discords offer exclusive previews, downloads, and insider advice on navigating new skate parks and environments.'
		},
		{
			title: 'Gear Discords',
			data: gearDiscords,
			description:
				'Find the latest custom gear and designs. These Discord channels are dedicated to customizing your gameplay experience with new gear, outfits, and accessories.'
		}
	];
</script>

<svelte:head>
	<title>Skatebit | Links</title>
</svelte:head>

<!-- Header Section -->
<header>
	<span class="badge variant-filled-primary">Skater XL</span>
	<h1>Links</h1>
	<hr />
</header>

{#each categories as category}
	<div>
		<h2>{category.title}</h2>
		<p>{category.description}</p>
		<div class="table-container">
			<table class="table table-hover">
				<thead>
					<tr>
						<th>Server</th>
						<th>Owner</th>
					</tr>
				</thead>
				<tbody>
					{#each category.data as server}
						<tr>
							<td>
								<a href={server.link} target="_blank">
									{server.name}
								</a>
							</td>
							<td>{server.owner}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/each}
