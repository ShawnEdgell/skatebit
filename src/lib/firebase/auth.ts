import { auth } from './init';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getUserProfile, updateUserProfile } from './users';

export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		const user = result.user;

		// 🔍 Check if user profile exists in Firestore
		const existingProfile = await getUserProfile(user.uid);

		// 🆕 Create Firestore user profile if missing
		if (!existingProfile) {
			await updateUserProfile(user.uid, {
				bio: '',
				links: {}
			});
		}

		return user;
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
