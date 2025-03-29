// Complete firebase common.ts
import {
	collection,
	doc,
	addDoc,
	getDocs,
	getDoc,
	updateDoc,
	deleteDoc,
	query,
	orderBy,
	serverTimestamp,
	arrayUnion,
	arrayRemove,
	type QueryConstraint
} from 'firebase/firestore';
import { db } from './init';

export async function getCollection<T>(
	path: string,
	...constraints: QueryConstraint[]
): Promise<T[]> {
	const q = query(collection(db, path), ...constraints);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as T[];
}

export async function addItem<T>(path: string, data: T): Promise<string> {
	const docRef = await addDoc(collection(db, path), {
		...data,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	return docRef.id;
}

export async function toggleLike(path: string, id: string, userId: string): Promise<void> {
	const ref = doc(db, path, id);
	const snap = await getDoc(ref);
	const data = snap.data();

	if (!data) return;

	const hasLiked = data.likedBy?.includes(userId);
	await updateDoc(ref, {
		likedBy: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
		likes: hasLiked ? Math.max((data.likes || 1) - 1, 0) : (data.likes || 0) + 1
	});
}

export async function getComments<T>(parentPath: string): Promise<T[]> {
	return getCollection<T>(parentPath, orderBy('createdAt', 'desc'));
}

export async function addComment<T>(
	parentPath: string,
	comment: Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
): Promise<T> {
	const commentDoc = await addDoc(collection(db, parentPath), {
		...comment,
		likes: 0,
		likedBy: [],
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	return {
		id: commentDoc.id,
		...comment,
		likes: 0,
		likedBy: [],
		createdAt: new Date(),
		updatedAt: new Date()
	} as T;
}

export async function editComment(parentPath: string, newText: string): Promise<void> {
	await updateDoc(doc(db, parentPath), {
		text: newText,
		updatedAt: serverTimestamp()
	});
}

export async function deleteComment(parentPath: string): Promise<void> {
	await deleteDoc(doc(db, parentPath));
}

// forum.ts and clips.ts will use the above functions for handling Firestore operations clearly and effectively.
