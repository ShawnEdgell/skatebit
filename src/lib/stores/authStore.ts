// src/lib/stores/authStore.ts
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

/**
 * Generic handler for authentication operations to reduce duplication.
 * It manages loading state and error handling.
 * @param operation - The async operation to perform.
 * @returns The result of the async operation.
 */
const handleAuthOperation = async <T>(operation: () => Promise<T>): Promise<T> => {
	isLoading.set(true);
	authError.set(null);
	try {
		return await operation();
	} catch (error: unknown) {
		console.error('Auth Error:', error);
		authError.set(error instanceof Error ? error.message : 'An unknown error occurred.');
		throw error;
	} finally {
		isLoading.set(false);
	}
};

// Listen for authentication state changes
onAuthStateChanged(auth, (firebaseUser) => {
	user.set(firebaseUser);
});

// Handle redirect results when the app initializes
handleAuthOperation(() => getRedirectResult(auth))
	.then((result) => {
		if (result?.user) {
			user.set(result.user);
		}
	})
	.catch(() => {
		// Error is already handled in handleAuthOperation
	});

/**
 * Logs in the user using Google as the provider.
 * Chooses between popup and redirect based on device type.
 */
export const login = () =>
	handleAuthOperation<void>(async () => {
		if (isMobileDevice()) {
			// Use redirect for mobile devices
			await signInWithRedirect(auth, googleProvider);
		} else {
			// Use popup for desktop devices
			const result = await signInWithPopup(auth, googleProvider);
			user.set(result.user);
		}
	});

/**
 * Logs out the current user.
 */
export const logout = () =>
	handleAuthOperation<void>(async () => {
		await signOut(auth);
		user.set(null);
	});
