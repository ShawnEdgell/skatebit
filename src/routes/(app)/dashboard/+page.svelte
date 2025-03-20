<script lang="ts">
	import LoginAvatar from './LoginAvatar.svelte';

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

<!-- Alert Message -->
<section>
	<div role="alert" class="alert alert-info my-6">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-current"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<span>
			This feature is currently under development and will be fully available in upcoming updates.
			We appreciate your patience as we work to bring you new stuff!
		</span>
	</div>
</section>

<LoginAvatar />
