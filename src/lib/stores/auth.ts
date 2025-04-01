// src/lib/stores/auth.ts
import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '$lib/firebase/init';
import type { User } from 'firebase/auth';

export const user = writable<User | null>(null);
export const authReady = writable(false);

onAuthStateChanged(auth, (u) => {
	user.set(u);
	authReady.set(true); // ✅ mark auth as initialized
});
