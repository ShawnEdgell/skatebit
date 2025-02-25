<script lang="ts">
	import { categories } from '$lib/data/discordData';
</script>

<svelte:head>
	<title>Skatebit | Helpful Links</title>
	<meta
		name="description"
		content="Helpful links and resources to get you started with Skater XL modding."
	/>
</svelte:head>

<header>
	<h1>Helpful Links</h1>
	<p>Helpful links and resources to get you started with Skater XL modding.</p>
	<hr />
</header>

<main>
	<section>
		<h2>skaterxl.mod.io</h2>
		<p>
			Explore and share a wide range of mods, including scripts, gear, maps, and more, on the main
			hub for Skater XL modding.
		</p>
		<a href="https://mod.io/g/skaterxl" class="btn btn-soft not-prose" target="_blank">
			skaterxl.mod.io
		</a>
	</section>

	<section>
		<h2>XL Hub by Fro</h2>
		<p>
			Browse, download, and manage your local and online community maps and mods. This application
			makes installing mods as easy as a single click.
		</p>
		<a href="https://mod.io/g/skaterxl/m/xlhub" class="btn btn-soft not-prose" target="_blank">
			XL Hub on mod.io
		</a>
	</section>

	<section>
		{#each categories as category}
			<section>
				<div>
					<h2>{category.title}</h2>
					<p>{category.description}</p>
					<table class="table-hover table">
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
										<a class="hover:no-underline" href={server.link} target="_blank">
											{server.name}
										</a>
									</td>
									<td>{server.owner}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</section>
		{/each}
	</section>
</main>
