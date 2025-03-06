<script lang="ts">
	import { onMount } from 'svelte';
	import { auth, googleProvider } from '../../../firebase';
	import {
		signInWithPopup,
		signOut,
		onAuthStateChanged,
		setPersistence,
		browserLocalPersistence
	} from 'firebase/auth';
	import type { User } from 'firebase/auth';

	let user: User | null = null;
	let errorMessage = '';
	let loading = true;

	async function signInWithGoogle() {
		errorMessage = '';
		try {
			await setPersistence(auth, browserLocalPersistence); // ensure persistence is set
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			errorMessage = 'Google sign-in failed. Please try again.';
			console.error(error);
		}
	}

	async function logout() {
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Error signing out:', error);
		}
	}

	onMount(() => {
		const unsubscribe = onAuthStateChanged(auth, (u) => {
			user = u;
			loading = false; // set loading to false once auth state is determined
		});
		return unsubscribe;
	});
</script>

<div>
	{#if loading}
		<!-- Optionally add a loading indicator here -->
		<p>Loading...</p>
	{:else if user}
		<div>
			<div>
				<p>Logged in as {user.displayName}</p>
				<p>{user.email}</p>
			</div>
			<button class="btn btn-primary" on:click={logout}>Logout</button>
		</div>
	{:else}
		<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
	{/if}

	{#if errorMessage}
		<p>{errorMessage}</p>
	{/if}
</div>
