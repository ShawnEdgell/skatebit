<script lang="ts">
	export let title: string;
	export let author: string | null = null;
	export let workingVersion: string | null = null;
	export let keybind: string | null = null;
	export let features: string[] | null = null;
	export let note: string | null = null;
	export let downloadLinks: { url: string; label: string }[] = [];
</script>

<div class="card p-4">
	<h3 class="mt-0">{title}</h3>

	{#if author}
		<div class="mb-1">
			<strong>Author:</strong> <span>{author}</span>
		</div>
	{/if}

	{#if workingVersion}
		<div class="mb-1">
			<strong>Working Version:</strong> <span>{workingVersion}</span>
		</div>
	{/if}

	{#if keybind}
		<div class="mb-1">
			<strong>Keybind:</strong> <span>{keybind}</span>
		</div>
	{/if}

	{#if features}
		<div class="mb-1">
			<strong>Features:</strong>
			<span>
				{#each features as feature, i}
					{feature}{#if i < features.length - 1},&nbsp;
					{/if}
				{/each}
			</span>
		</div>
	{/if}

	{#if note}
		<div class="mb-1">
			<strong>Note:</strong> <span>{note}</span>
		</div>
	{/if}

	<div class="flex flex-wrap items-start">
		{#each downloadLinks as { url, label }}
			<a
				href={url}
				class="btn mt-2 mr-2 variant-filled-secondary no-underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				{label}
			</a>
		{/each}
	</div>
</div>
