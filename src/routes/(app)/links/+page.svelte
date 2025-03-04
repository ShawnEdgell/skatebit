<script lang="ts">
	import { categories } from '$lib/data/discordData';

	const pageTitle = 'Helpful Links';
	const pageDescription = 'Helpful links and resources to get you started with Skater XL modding.';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

<!-- Skater XL Mod.io -->
<section>
	<div class="card bg-base-200 card-lg not-prose mb-4 shadow-sm">
		<div class="card-body">
			<h2 class="card-title font-bold">skaterxl.mod.io</h2>
			<p>
				Explore and share a wide range of mods, including scripts, gear, maps, and more, on the main
				hub for Skater XL modding.
			</p>

			<a href="https://mod.io/g/skaterxl" class="btn btn-primary mt-2" target="_blank">
				skaterxl.mod.io
			</a>
		</div>
	</div>
</section>

<!-- XL Hub by Fro -->
<section>
	<div class="card bg-base-200 card-lg not-prose mt-4 shadow-sm">
		<div class="card-body">
			<h2 class="card-title font-bold">XL Hub by Fro</h2>
			<p>
				Browse, download, and manage your local and online community maps and mods. This application
				makes installing mods as easy as a single click.
			</p>
			<a href="https://mod.io/g/skaterxl/m/xlhub" class="btn btn-primary mt-2" target="_blank">
				XL Hub on mod.io
			</a>
		</div>
	</div>
</section>

<!-- Tabels -->
<section>
	{#each categories as category}
		<section>
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
		</section>
	{/each}
</section>
