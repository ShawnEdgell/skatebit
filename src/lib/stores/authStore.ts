import { writable } from 'svelte/store';
import { auth, googleProvider } from '$lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Create a writable store to hold the user
export const user = writable<User | null>(null);

// Listen for authentication state changes
onAuthStateChanged(auth, (firebaseUser) => {
	user.set(firebaseUser);
});

/**
 * Function to handle user login using Google as the provider.
 */
export const login = async () => {
	try {
		await signInWithPopup(auth, googleProvider);
	} catch (error) {
		console.error('Error signing in with Google:', error);
		// Optional: Implement user-friendly error handling here
	}
};

/**
 * Function to handle user logout.
 */
export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Error signing out:', error);
		// Optional: Implement user-friendly error handling here
	}
};
