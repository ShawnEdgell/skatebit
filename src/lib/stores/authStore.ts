// src/lib/stores/authStore.ts

import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Create a writable store to hold the user
export const user = writable<User | null>(null);

// Listen for authentication state changes
onAuthStateChanged(auth, (firebaseUser) => {
	user.set(firebaseUser);
});
