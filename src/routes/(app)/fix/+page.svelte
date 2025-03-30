<script lang="ts">
	import { user } from '$lib/stores/auth';
	import GoogleLoginButton from '$lib/components/GoogleLoginButton.svelte';
	import Alert from '$lib/components/Alert.svelte';

	const pageTitle = 'Temporary Fix';
	const pageDescription =
		'Click the button below to return to the Clip of the Week page. You should be able to upload your clip after returning.';
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

<a href="/cotw" class="btn btn-primary not-prose mt-16">Return to Clip of the Week</a>
