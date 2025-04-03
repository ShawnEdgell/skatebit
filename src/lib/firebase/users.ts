import { db } from './init';
import { doc, getDoc, setDoc, serverTimestamp, type DocumentReference } from 'firebase/firestore';
import type { UserProfile } from '$lib/types/users';

const USERS_COLLECTION = 'users';

/**
 * Get a user's profile data by their UID.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
	const ref = doc(db, USERS_COLLECTION, uid);
	const snap = await getDoc(ref);
	return snap.exists() ? (snap.data() as UserProfile) : null;
}

/**
 * Update or create a user profile.
 */
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
	const ref = doc(db, USERS_COLLECTION, uid);
	await setDoc(
		ref,
		{
			...data,
			updatedAt: serverTimestamp()
		},
		{ merge: true }
	);
}

/**
 * Optionally: Get a typed doc ref for convenience
 */
export function getUserDocRef(uid: string): DocumentReference {
	return doc(db, USERS_COLLECTION, uid);
}
