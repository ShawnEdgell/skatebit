<script lang="ts">
	import { categories } from './linksData';
</script>

<svelte:head>
	<title>Skatebit | Helpful Links</title>
	<meta
		name="description"
		content="Discover popular Skater XL Discord servers and websites for additional mods, tutorials, and communities."
	/>
</svelte:head>

<header>
	<span class="badge variant-filled-primary mb-2">Skater XL</span>
	<h1>Helpful Links</h1>
	<p>
		Find essential Discord and website links for Skater XL mods, tutorials, and communities,
		connecting you with the creators and content that enhance your gaming experience.
	</p>
	<hr />
</header>

<section>
	<h2>skaterxl.mod.io</h2>
	<p>
		Explore and share a wide range of Skater XL mods, including scripts, gear, maps, and more, on
		the essential hub for modding.
	</p>
	<a
		href="https://mod.io/g/skaterxl"
		class="mt-4 btn mr-2 variant-filled-secondary no-underline"
		target="_blank">skaterxl.mod.io</a
	>
</section>

<section>
	{#each categories as category}
		<hr />
		<div>
			<h2>{category.title}</h2>
			<p>{category.description}</p>

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
								<a href={server.link} target="_blank">{server.name}</a>
							</td>
							<td>{server.owner}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/each}
</section>
