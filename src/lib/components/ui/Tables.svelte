<script lang="ts">
	import type { Category } from '$lib';

	export let categories: Category[];
</script>

{#each categories as category}
	<section>
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
	</section>
{/each}
