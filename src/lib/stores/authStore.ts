import { writable } from 'svelte/store';
import { auth, googleProvider } from '$lib/firebase';
import {
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	onAuthStateChanged,
	signOut
} from 'firebase/auth';

import type { User } from 'firebase/auth';

import { isMobileDevice } from '$lib/utils/device';

// Create writable stores
export const user = writable<User | null>(null);
export const authError = writable<string | null>(null);
export const isLoading = writable<boolean>(false);

// Listen for authentication state changes
onAuthStateChanged(auth, (firebaseUser) => {
	user.set(firebaseUser);
});

// Handle redirect results when the app initializes
getRedirectResult(auth)
	.then((result) => {
		if (result && result.user) {
			user.set(result.user);
		}
	})
	.catch((error) => {
		console.error('Error handling redirect result:', error);
		if (error instanceof Error) {
			authError.set(error.message);
		} else {
			authError.set('An unknown error occurred.');
		}
	});

/**
 * Logs in the user using Google as the provider.
 * Chooses between popup and redirect based on device type.
 */
export const login = async () => {
	isLoading.set(true);
	authError.set(null);
	try {
		if (isMobileDevice()) {
			// Use redirect for mobile devices
			await signInWithRedirect(auth, googleProvider);
		} else {
			// Use popup for desktop devices
			const result = await signInWithPopup(auth, googleProvider);
			user.set(result.user);
		}
	} catch (error: unknown) {
		console.error('Login Error:', error);
		if (error instanceof Error) {
			authError.set(error.message);
		} else {
			authError.set('An unknown error occurred during login.');
		}
		throw error; // Allow the component to handle the error if needed
	} finally {
		isLoading.set(false);
	}
};

/**
 * Logs out the current user.
 */
export const logout = async () => {
	isLoading.set(true);
	authError.set(null);
	try {
		await signOut(auth);
		user.set(null);
	} catch (error: unknown) {
		console.error('Logout Error:', error);
		if (error instanceof Error) {
			authError.set(error.message);
		} else {
			authError.set('An unknown error occurred during logout.');
		}
		throw error; // Allow the component to handle the error if needed
	} finally {
		isLoading.set(false);
	}
};
