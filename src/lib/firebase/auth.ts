import { auth } from './init';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	const result = await signInWithPopup(auth, googleProvider);
	return result.user;
}

export async function logout() {
	return await signOut(auth);
}
