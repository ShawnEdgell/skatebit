<script lang="ts">
	import Tables from './Tables.svelte';

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

<Tables />
