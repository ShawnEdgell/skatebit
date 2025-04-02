<script lang="ts">
	import { categories } from '$lib/data/discordData';
</script>

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
