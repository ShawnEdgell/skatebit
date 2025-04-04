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

<div role="alert" class="alert alert-info">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 shrink-0 stroke-current"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
		/>
	</svg>
	<span
		>Discord has a rate limit that blocks users from joining too many servers in a short period of
		time. Based on user reports, the limit is around 10 servers within a few minutes. If links stop
		working, wait ~15 minutes and try again.</span
	>
</div>

<Tables />
