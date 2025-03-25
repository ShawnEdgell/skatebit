import { auth } from './init';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		return result.user;
	} catch (error) {
		console.error('Google login failed:', error);
		throw error;
	}
}

export async function logout() {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Logout failed:', error);
		throw error;
	}
}
