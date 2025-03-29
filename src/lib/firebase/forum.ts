// forum.ts (Refactored)
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
import type { ForumPost, ForumComment } from '$lib/types/forum';
import { doc, collection, getDocs, orderBy, where } from 'firebase/firestore';

export async function submitForumPost(
	post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
) {
	return addItem('posts', { ...post, likes: 0, likedBy: [] });
}

export async function getForumThread(threadId: string): Promise<ForumPost | null> {
	const results = await getCollection<ForumPost>('posts', where('__name__', '==', threadId));
	return results[0] || null;
}

export async function getForumPosts(): Promise<ForumPost[]> {
	const posts = await getCollection<ForumPost>('posts', orderBy('createdAt', 'desc'));
	return Promise.all(
		posts.map(async (post) => ({
			...post,
			commentsCount: post.id
				? (await getDocs(collection(doc(db, 'posts', post.id), 'comments'))).size
				: 0
		}))
	);
}

export async function deleteForumThread(threadId: string) {
	await deleteComment(`posts/${threadId}`);
}

export async function updateForumThread(threadId: string, newTitle: string, newContent: string) {
	await editComment(`posts/${threadId}`, `${newTitle}\n${newContent}`);
}

export async function likeForumPost(threadId: string, userId: string) {
	await toggleLike('posts', threadId, userId);
}

export async function getForumComments(threadId: string): Promise<ForumComment[]> {
	return getComments(`posts/${threadId}/comments`);
}

export async function addForumComment(
	threadId: string,
	comment: Omit<ForumComment, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
) {
	return addComment(`posts/${threadId}/comments`, comment);
}

export async function editForumComment(threadId: string, commentId: string, newText: string) {
	await editComment(`posts/${threadId}/comments/${commentId}`, newText);
}

export async function deleteForumComment(threadId: string, commentId: string) {
	await deleteComment(`posts/${threadId}/comments/${commentId}`);
}

export async function likeForumComment(threadId: string, commentId: string, userId: string) {
	await toggleLike(`posts/${threadId}/comments`, commentId, userId);
}
