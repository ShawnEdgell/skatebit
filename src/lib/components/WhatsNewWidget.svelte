<script lang="ts">
	const updates = [
		{
			text: '🏆 Hall of Fame added',
			link: '/halloffame'
		},
		{
			text: '⭐ Clip of the Week challenge added',
			link: '/cotw'
		},
		{
			text: '💬 Forum section added',
			link: '/forum'
		},
		{
			text: '📌 Essential Settings added to stats page',
			link: '/stats'
		}
	];
</script>

<div class="card bg-base-200 space-y-4 p-4 shadow">
	<h3 class="text-lg font-semibold">👀 What’s New?</h3>

	<ul class="list-inside list-disc space-y-2 text-sm">
		{#each updates as update}
			<li>
				<a href={update.link} class="hover:text-primary no-underline">
					{update.text}
				</a>
			</li>
		{/each}
	</ul>
</div>
