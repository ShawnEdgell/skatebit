<script lang="ts">
	import { pageHeader, categories, ModWebsite, XLHub, Tables } from '$lib';

	const { title, description, heading } = pageHeader.links;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<header>
	<h1>{heading}</h1>
	<p>{description}</p>
	<hr />
</header>

<main>
	<article>
		<ModWebsite />
		<XLHub />
		<Tables {categories} />
	</article>
</main>
