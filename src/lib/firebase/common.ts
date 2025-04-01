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

function docRef(path: string, id: string) {
	return doc(db, path, id);
}

// 🔹 Generic Collection Fetch
export async function getCollection<T>(
	path: string,
	...constraints: QueryConstraint[]
): Promise<T[]> {
	const q = query(collection(db, path), ...constraints);
	const snapshot = await getDocs(q);
	return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as T[];
}

// 🔹 Add New Item to Collection
export async function addItem<T>(path: string, data: T): Promise<string> {
	const docRef = await addDoc(collection(db, path), {
		...data,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
	return docRef.id;
}

// 🔹 Like / Unlike Handler (for posts or comments)
export async function toggleLike(path: string, id: string, userId: string): Promise<void> {
	const ref = docRef(path, id);
	const snap = await getDoc(ref);
	const data = snap.data();

	if (!data) return;

	const hasLiked = data.likedBy?.includes(userId);
	await updateDoc(ref, {
		likedBy: hasLiked ? arrayRemove(userId) : arrayUnion(userId),
		likes: hasLiked ? Math.max((data.likes || 1) - 1, 0) : (data.likes || 0) + 1
	});
}

// 🔹 Comments: Read
export async function getComments<T>(parentPath: string): Promise<T[]> {
	return getCollection<T>(parentPath, orderBy('createdAt', 'desc'));
}

// 🔹 Comments: Create
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

// 🔹 Comments: Edit
export async function editComment(parentPath: string, newText: string): Promise<void> {
	await updateDoc(doc(db, parentPath), {
		text: newText,
		updatedAt: serverTimestamp()
	});
}

// 🔹 Comments: Delete
export async function deleteComment(parentPath: string): Promise<void> {
	await deleteDoc(doc(db, parentPath));
}
