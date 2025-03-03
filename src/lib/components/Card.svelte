<script lang="ts">
	export let title: string;
	export let content: string;
</script>

<div class="card bg-base-200 not-prose">
	<div class="card-body">
		<h2 class="card-title prose">{title}</h2>
		<p class="prose">{content}</p>
	</div>
</div>
