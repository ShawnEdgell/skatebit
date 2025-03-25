import {
	doc,
	getDoc,
	getDocs,
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	query,
	orderBy,
	serverTimestamp,
	arrayUnion,
	arrayRemove
} from 'firebase/firestore';
import { db } from './init';
import type { ForumPost, ForumComment } from '$lib/types/forum';

// ========================= Threads =========================

export async function getForumThread(threadId: string): Promise<ForumPost | null> {
	const postRef = doc(db, 'posts', threadId);
	const postSnap = await getDoc(postRef);
	if (postSnap.exists()) {
		return { id: postSnap.id, ...postSnap.data() } as ForumPost;
	}
	return null;
}

export async function getForumPosts(): Promise<ForumPost[]> {
	const postsRef = collection(db, 'posts');
	const postsQuery = query(postsRef, orderBy('createdAt', 'desc'));
	const snapshot = await getDocs(postsQuery);

	const postsWithCounts: ForumPost[] = await Promise.all(
		snapshot.docs.map(async (docSnap) => {
			const postData = docSnap.data() as ForumPost;
			const postId = docSnap.id;
			const commentsRef = collection(db, 'posts', postId, 'comments');
			const commentsSnap = await getDocs(commentsRef);

			return {
				id: postId,
				...postData,
				commentsCount: commentsSnap.size
			};
		})
	);

	return postsWithCounts;
}

export async function submitForumPost(
	post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
): Promise<void> {
	const postsRef = collection(db, 'posts');
	await addDoc(postsRef, {
		...post,
		likes: 0,
		likedBy: [],
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	});
}

export async function deleteForumThread(threadId: string): Promise<void> {
	await deleteDoc(doc(db, 'posts', threadId));
}

export async function updateForumThread(
	threadId: string,
	newTitle: string,
	newContent: string
): Promise<void> {
	const postRef = doc(db, 'posts', threadId);
	await updateDoc(postRef, {
		title: newTitle,
		content: newContent,
		updatedAt: serverTimestamp()
	});
}

export async function likeForumPost(threadId: string, userId: string): Promise<void> {
	const postRef = doc(db, 'posts', threadId);
	const postSnap = await getDoc(postRef);
	const postData = postSnap.data();

	if (!postData?.likedBy?.includes(userId)) {
		await updateDoc(postRef, {
			likedBy: arrayUnion(userId),
			likes: (postData?.likes || 0) + 1
		});
	} else {
		await updateDoc(postRef, {
			likedBy: arrayRemove(userId),
			likes: Math.max((postData?.likes || 1) - 1, 0)
		});
	}
}

// ========================= Comments =========================

export async function getForumComments(threadId: string): Promise<ForumComment[]> {
	const postRef = doc(db, 'posts', threadId);
	const commentsRef = collection(postRef, 'comments');
	const commentsQuery = query(commentsRef, orderBy('createdAt', 'desc'));
	const snapshot = await getDocs(commentsQuery);

	return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ForumComment[];
}

export async function addForumComment(
	threadId: string,
	comment: Omit<ForumComment, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
): Promise<ForumComment> {
	const postRef = doc(db, 'posts', threadId);
	const commentsRef = collection(postRef, 'comments');
	const commentDoc = await addDoc(commentsRef, {
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

export async function editForumComment(
	threadId: string,
	commentId: string,
	newText: string
): Promise<void> {
	const commentRef = doc(db, 'posts', threadId, 'comments', commentId);
	await updateDoc(commentRef, {
		text: newText,
		updatedAt: serverTimestamp()
	});
}

export async function deleteForumComment(threadId: string, commentId: string): Promise<void> {
	const commentRef = doc(db, 'posts', threadId, 'comments', commentId);
	await deleteDoc(commentRef);
}

export async function likeForumComment(
	threadId: string,
	commentId: string,
	userId: string
): Promise<void> {
	const commentRef = doc(db, 'posts', threadId, 'comments', commentId);
	const commentSnap = await getDoc(commentRef);
	const commentData = commentSnap.data();

	if (!commentData?.likedBy?.includes(userId)) {
		await updateDoc(commentRef, {
			likedBy: arrayUnion(userId),
			likes: (commentData?.likes || 0) + 1
		});
	} else {
		await updateDoc(commentRef, {
			likedBy: arrayRemove(userId),
			likes: Math.max((commentData?.likes || 1) - 1, 0)
		});
	}
}
