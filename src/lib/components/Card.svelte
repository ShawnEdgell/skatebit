<script lang="ts">
	export let title: string;
	export let content: string = '';
	export let download: string = '';
</script>

<div class="card card-lg bg-base-200 not-prose">
	<div class="card-body">
		<h2 class="card-title prose">{title}</h2>
		{#if content}
			<p class="prose">{content}</p>
		{/if}
		{#if download}
			<div class="flex w-full justify-end">
				<a class="btn btn-primary" href={download}>Download</a>
			</div>
		{/if}
		<slot />
	</div>
</div>
