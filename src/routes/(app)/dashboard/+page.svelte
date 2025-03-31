<script lang="ts">
	import { user } from '$lib/stores/auth';
	import GoogleLoginButton from '$lib/components/auth/GoogleLoginButton.svelte';
	import Alert from '$lib/components/ui/Alert.svelte';

	const pageTitle = 'Dashboard';
	const pageDescription = 'Manage your account and settings.';
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

<Alert message="We are currently performing updates on this page. Stay tuned for more features!" />

{#if $user}
	<div class="card bg-base-200 card-lg px-6">
		<section class="flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<img
					class="h-10 w-10 rounded-full"
					src={$user.photoURL || 'https://via.placeholder.com/40'}
					alt={$user.displayName || 'User'}
				/>
				<p>Welcome, {$user.displayName}!</p>
			</div>
			<GoogleLoginButton />
		</section>
	</div>
{:else}
	<div class="card bg-base-200 card-lg px-6">
		<section class="my-8 flex items-center justify-center">
			<GoogleLoginButton />
		</section>
	</div>
{/if}
