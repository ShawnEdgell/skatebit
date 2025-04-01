import { db } from './init';
import {
	getCollection,
	addItem,
	toggleLike,
	getComments,
	addComment,
	editComment,
	deleteComment
} from './common';
import type { ClipPost, ClipComment } from '$lib/types/clips';
import { deleteDoc, doc, collection, getDocs, orderBy, where } from 'firebase/firestore';

const CLIPS_COLLECTION = 'clips';

function clipCommentsPath(clipId: string) {
	return `${CLIPS_COLLECTION}/${clipId}/comments`;
}

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// 🔹 Clip Submission
export async function submitClipPost(
	post: Omit<ClipPost, 'id' | 'timestamp' | 'likes' | 'likedBy' | 'commentsCount'>
) {
	return addItem(CLIPS_COLLECTION, { ...post, likes: 0, likedBy: [] });
}

export async function checkSubmissionStatus(uid: string, weekId: string) {
	const existing = await getUserClipThisWeek(uid, weekId);
	return !!existing; // returns true if clip exists
}

// 🔹 Clip Retrieval
export async function getUserClipThisWeek(uid: string, weekId: string): Promise<ClipPost | null> {
	const results = await getCollection<ClipPost>(
		CLIPS_COLLECTION,
		where('uid', '==', uid),
		where('weekId', '==', weekId)
	);
	return results[0] || null;
}

export async function getClipById(id: string): Promise<ClipPost | null> {
	const results = await getCollection<ClipPost>(CLIPS_COLLECTION, where('__name__', '==', id));
	return results[0] || null;
}

export async function getClipPosts(
	sortBy: 'latest' | 'popular' = 'latest',
	weekId?: string
): Promise<ClipPost[]> {
	const conditions = [
		...(weekId ? [where('weekId', '==', weekId)] : []),
		orderBy(sortBy === 'latest' ? 'timestamp' : 'likes', 'desc')
	];

	const clips = await getCollection<ClipPost>(CLIPS_COLLECTION, ...conditions);

	return Promise.all(
		clips.map(async (clip) => ({
			...clip,
			commentsCount: clip.id
				? (await getDocs(collection(doc(db, CLIPS_COLLECTION, clip.id), 'comments'))).size
				: 0
		}))
	);
}

// 🔹 Clip Likes
export async function likeClipPost(clipId: string, userId: string) {
	await toggleLike(CLIPS_COLLECTION, clipId, userId);
}

// 🔹 Clip Deletion
export async function deleteClipPost(clipId: string) {
	await deleteDoc(doc(db, CLIPS_COLLECTION, clipId));
	await wait(250); // delay to allow propagation
}

// 🔹 Comments (CRUD)
export async function getClipComments(clipId: string): Promise<ClipComment[]> {
	return getComments(clipCommentsPath(clipId));
}

export async function addClipComment(
	clipId: string,
	comment: Omit<ClipComment, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
) {
	return addComment(clipCommentsPath(clipId), comment);
}

export async function editClipComment(clipId: string, commentId: string, newText: string) {
	await editComment(`${clipCommentsPath(clipId)}/${commentId}`, newText);
}

export async function deleteClipComment(clipId: string, commentId: string) {
	await deleteComment(`${clipCommentsPath(clipId)}/${commentId}`);
}

export async function likeClipComment(clipId: string, commentId: string, userId: string) {
	await toggleLike(clipCommentsPath(clipId), commentId, userId);
}
