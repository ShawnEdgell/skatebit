// src/lib/firebase/auth.ts
import { auth } from './init';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	const result = await signInWithPopup(auth, googleProvider);
	const token = await result.user.getIdToken();

	await fetch('/api/session', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token })
	});

	// Store basic info for client-side usage (not secure info!)
	document.cookie = `displayName=${encodeURIComponent(result.user.displayName ?? '')}; path=/`;
	document.cookie = `photoURL=${encodeURIComponent(result.user.photoURL ?? '')}; path=/`;

	return result.user;
}

export async function logout() {
	// Clear session cookie server-side
	await fetch('/api/session', { method: 'DELETE' });

	// Sign out from Firebase client
	return await signOut(auth);
}
