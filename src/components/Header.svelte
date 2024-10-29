<!-- GuideHeader.svelte -->
<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<header>
	<span class="badge variant-filled-primary mb-2">Skater XL</span>
	<h1>{title}</h1>
	<p>{description}</p>
	<hr />
</header>
