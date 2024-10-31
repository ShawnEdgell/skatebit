<!-- src/components/LoginAvatar.svelte -->
<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { user, login, logout } from '$lib/stores/authStore'; // Import login and logout from the store
	import { onDestroy } from 'svelte';

	let isAuthLoading = false;

	// Function to handle user login
	const handleLogin = async () => {
		isAuthLoading = true;
		await login();
		isAuthLoading = false;
	};

	// Function to handle user logout
	const handleLogout = async () => {
		isAuthLoading = true;
		await logout();
		isAuthLoading = false;
	};
</script>

<div class="flex pl-2 md:pl-4">
	{#if $user}
		<button
			class="btn btn-ghost p-0"
			on:click={handleLogout}
			disabled={isAuthLoading}
			aria-label="Logout"
			title="Logout"
		>
			{#if $user.photoURL}
				<Avatar
					src={$user.photoURL}
					class="w-7 h-7 md:w-8 md:h-8 rounded-full"
					alt="Profile Picture"
				/>
			{:else}
				<Avatar class="w-7 h-7 md:w-8 md:h-8 bg-primary-500" alt="Profile Picture" />
			{/if}
		</button>
	{:else}
		<button
			class="btn btn-ghost flex items-center gap-2 p-0"
			on:click={handleLogin}
			disabled={isAuthLoading}
			aria-label="Login with Google"
		>
			<svg
				fill="currentColor"
				viewBox="-8 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
				class="w-7 h-7 md:w-8 md:h-8"
			>
				<path
					d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
				></path>
			</svg>
			<!-- Optional: Add text or leave it as an icon only -->
		</button>
	{/if}
</div>
