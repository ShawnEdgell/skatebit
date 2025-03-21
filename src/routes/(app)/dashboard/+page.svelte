<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import LoginAvatar from '$lib/components/LoginAvatar.svelte';

	const pageTitle = 'Dashboard';
	const pageDescription =
		'Access and manage your account, update your profile, and customize your settings.';
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

<Alert
	message="This feature is currently under development and will be fully available in upcoming updates.
			We appreciate your patience as we work to bring you new stuff!"
/>

<LoginAvatar />
