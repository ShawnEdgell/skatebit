import {
	collection,
	doc,
	addDoc,
	getDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	query,
	where,
	orderBy,
	serverTimestamp,
	arrayUnion,
	arrayRemove
} from 'firebase/firestore';
import { db } from './init';
import type { ClipPost, ClipComment } from '$lib/types/clips';

// ===================== Clip Posts =====================

export async function submitClipPost(
	post: Omit<ClipPost, 'id' | 'timestamp' | 'likes' | 'likedBy' | 'commentsCount'>
): Promise<void> {
	await addDoc(collection(db, 'clips'), {
		...post,
		timestamp: serverTimestamp(),
		likes: 0,
		likedBy: []
	});
}

export async function getClipById(id: string): Promise<ClipPost | null> {
	const ref = doc(db, 'clips', id);
	const snap = await getDoc(ref);
	if (!snap.exists()) return null;
	return { id: snap.id, ...snap.data() } as ClipPost;
}

export async function getClipPosts(sortBy: 'latest' | 'popular' = 'latest'): Promise<ClipPost[]> {
	const baseQuery = query(
		collection(db, 'clips'),
		orderBy(sortBy === 'latest' ? 'timestamp' : 'likes', 'desc')
	);

	const snapshot = await getDocs(baseQuery);

	const clipsWithCounts: ClipPost[] = await Promise.all(
		snapshot.docs.map(async (docSnap) => {
			const clipData = docSnap.data() as ClipPost;
			const clipId = docSnap.id;

			// Fetch and count comments
			const commentsSnap = await getDocs(collection(db, 'clips', clipId, 'comments'));

			return {
				id: clipId,
				...clipData,
				commentsCount: commentsSnap.size
			};
		})
	);

	return clipsWithCounts;
}

export async function getUserClipThisWeek(uid: string, weekId: string): Promise<ClipPost | null> {
	const q = query(collection(db, 'clips'), where('uid', '==', uid), where('weekId', '==', weekId));
	const snapshot = await getDocs(q);
	if (!snapshot.empty) {
		const doc = snapshot.docs[0];
		return { id: doc.id, ...doc.data() } as ClipPost;
	}
	return null;
}

export async function deleteClipPost(clipId: string): Promise<void> {
	await deleteDoc(doc(db, 'clips', clipId));
}

export async function likeClipPost(clipId: string, userId: string): Promise<void> {
	const clipRef = doc(db, 'clips', clipId);
	const clipSnap = await getDoc(clipRef);
	const data = clipSnap.data();

	if (!data) return;

	if (data.likedBy?.includes(userId)) {
		await updateDoc(clipRef, {
			likedBy: arrayRemove(userId),
			likes: Math.max((data.likes || 1) - 1, 0)
		});
	} else {
		await updateDoc(clipRef, {
			likedBy: arrayUnion(userId),
			likes: (data.likes || 0) + 1
		});
	}
}

// ===================== Clip Comments =====================

export async function getClipComments(clipId: string): Promise<ClipComment[]> {
	const snapshot = await getDocs(
		query(collection(db, `clips/${clipId}/comments`), orderBy('createdAt', 'desc'))
	);
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data()
	})) as ClipComment[];
}

export async function addClipComment(
	clipId: string,
	comment: Omit<ClipComment, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
): Promise<ClipComment> {
	const ref = collection(db, `clips/${clipId}/comments`);
	const commentDoc = await addDoc(ref, {
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
	};
}

export async function editClipComment(
	clipId: string,
	commentId: string,
	newText: string
): Promise<void> {
	const commentRef = doc(db, `clips/${clipId}/comments/${commentId}`);
	await updateDoc(commentRef, {
		text: newText,
		updatedAt: serverTimestamp()
	});
}

export async function deleteClipComment(clipId: string, commentId: string): Promise<void> {
	await deleteDoc(doc(db, `clips/${clipId}/comments/${commentId}`));
}

export async function likeClipComment(
	clipId: string,
	commentId: string,
	userId: string
): Promise<void> {
	const ref = doc(db, `clips/${clipId}/comments/${commentId}`);
	const snap = await getDoc(ref);
	const data = snap.data();

	if (!data) return;

	if (data.likedBy?.includes(userId)) {
		await updateDoc(ref, {
			likedBy: arrayRemove(userId),
			likes: Math.max((data.likes || 1) - 1, 0)
		});
	} else {
		await updateDoc(ref, {
			likedBy: arrayUnion(userId),
			likes: (data.likes || 0) + 1
		});
	}
}
