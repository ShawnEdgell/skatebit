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
