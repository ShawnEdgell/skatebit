// clips.ts (Refactored)
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
import { doc, collection, getDocs, orderBy, where } from 'firebase/firestore';

export async function submitClipPost(
	post: Omit<ClipPost, 'id' | 'timestamp' | 'likes' | 'likedBy' | 'commentsCount'>
) {
	return addItem('clips', { ...post, likes: 0, likedBy: [] });
}

export async function getUserClipThisWeek(uid: string, weekId: string): Promise<ClipPost | null> {
	const results = await getCollection<ClipPost>(
		'clips',
		where('uid', '==', uid),
		where('weekId', '==', weekId)
	);
	return results[0] || null;
}

export async function getClipById(id: string): Promise<ClipPost | null> {
	const results = await getCollection<ClipPost>('clips', where('__name__', '==', id));
	return results[0] || null;
}

export async function getClipPosts(sortBy: 'latest' | 'popular' = 'latest'): Promise<ClipPost[]> {
	const clips = await getCollection<ClipPost>(
		'clips',
		orderBy(sortBy === 'latest' ? 'timestamp' : 'likes', 'desc')
	);
	return Promise.all(
		clips.map(async (clip) => ({
			...clip,
			commentsCount: clip.id
				? (await getDocs(collection(doc(db, 'clips', clip.id), 'comments'))).size
				: 0
		}))
	);
}

export async function deleteClipPost(clipId: string) {
	await deleteComment(`clips/${clipId}`);
}

export async function likeClipPost(clipId: string, userId: string) {
	await toggleLike('clips', clipId, userId);
}

export async function getClipComments(clipId: string): Promise<ClipComment[]> {
	return getComments(`clips/${clipId}/comments`);
}

export async function addClipComment(
	clipId: string,
	comment: Omit<ClipComment, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
) {
	return addComment(`clips/${clipId}/comments`, comment);
}

export async function editClipComment(clipId: string, commentId: string, newText: string) {
	await editComment(`clips/${clipId}/comments/${commentId}`, newText);
}

export async function deleteClipComment(clipId: string, commentId: string) {
	await deleteComment(`clips/${clipId}/comments/${commentId}`);
}

export async function likeClipComment(clipId: string, commentId: string, userId: string) {
	await toggleLike(`clips/${clipId}/comments`, commentId, userId);
}
