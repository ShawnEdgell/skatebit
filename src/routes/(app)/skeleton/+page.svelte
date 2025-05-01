<script lang="ts">
	import Divider from '$lib/components/layout/Divider.svelte';

	const pageTitle = 'Skeleton';
	const pageDescription = 'Description';
</script>

<!-- Page Data -->
<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>
		{pageDescription}
	</p>
	<Divider />
</section>
