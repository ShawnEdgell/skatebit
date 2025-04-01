<script lang="ts">
	import { signInWithGoogle, logout } from '$lib/firebase/auth';
	import { user } from '$lib/stores/auth';

	let errorMessage = '';

	async function login() {
		errorMessage = '';
		try {
			await signInWithGoogle();
		} catch (error) {
			errorMessage = 'Login failed. Please try again.';
		}
	}

	async function handleLogout() {
		try {
			await logout();
		} catch (error) {
			errorMessage = 'Logout failed. Please try again.';
		}
	}
</script>

{#if typeof window === 'undefined'}
	<span class="loading loading-spinner loading-lg text-primary mt-1 mb-2"></span>
{:else if $user}
	<button on:click={handleLogout} class="btn btn-error">Logout</button>
{:else}
	<button on:click={login} class="btn btn-primary">
		<svg class="mr-2 h-6 w-6" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
			<path
				fill="#FBBC05"
				d="M9.83 24a14.2 14.2 0 0 1 .7-4.36L2.62 13.6a23.8 23.8 0 0 0 0 20.8l7.9-6.04A14.2 14.2 0 0 1 9.83 24z"
			/>
			<path
				fill="#EB4335"
				d="M23.71 10.13c3.31 0 6.3 1.17 8.66 3.1l6.84-6.83a23.8 23.8 0 0 0-38.6 7.2l7.9 6.04a14.2 14.2 0 0 1 15.2-9.5z"
			/>
			<path
				fill="#34A853"
				d="M23.71 37.87a14.2 14.2 0 0 1-13.18-9.5l-7.9 6.04a23.8 23.8 0 0 0 38.6 7.2l-7.5-5.8a14.2 14.2 0 0 1-10.02 2.06z"
			/>
			<path
				fill="#4285F4"
				d="M46.15 24c0-1.38-.21-2.86-.54-4.27H23.71v9.07h12.6a14.2 14.2 0 0 1-4.8 6.94l7.5 5.8a23.8 23.8 0 0 0 6.18-17.54z"
			/>
		</svg>
		Login with Google
	</button>
{/if}

{#if errorMessage}
	<p class="text-error mt-2">{errorMessage}</p>
{/if}
