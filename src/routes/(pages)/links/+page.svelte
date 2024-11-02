<script lang="ts">
	import { pageHeader, categories, ModWebsite, XLHub, Tables } from '$lib';

	const { title, description, heading } = pageHeader.links;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<section>
	<h1>{heading}</h1>
	<p>{description}</p>
	<hr />
</section>

<ModWebsite />
<XLHub />
<Tables {categories} />
