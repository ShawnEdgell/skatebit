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
import {
	doc,
	collection,
	getDocs,
	orderBy,
	where,
	deleteDoc,
	updateDoc,
	serverTimestamp
} from 'firebase/firestore';

const POSTS_COLLECTION = 'posts';

function forumCommentPath(threadId: string) {
	return `${POSTS_COLLECTION}/${threadId}/comments`;
}

// 🔹 Submission
export async function submitForumPost(
	post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
) {
	return addItem(POSTS_COLLECTION, {
		...post,
		likes: 0,
		likedBy: []
	});
}

// 🔹 Retrieval
export async function getForumThread(threadId: string): Promise<ForumPost | null> {
	const results = await getCollection<ForumPost>(
		POSTS_COLLECTION,
		where('__name__', '==', threadId)
	);
	return results[0] || null;
}

export async function getForumPosts(): Promise<ForumPost[]> {
	const posts = await getCollection<ForumPost>(POSTS_COLLECTION, orderBy('createdAt', 'desc'));

	return Promise.all(
		posts.map(async (post) => ({
			...post,
			commentsCount: post.id
				? (await getDocs(collection(doc(db, POSTS_COLLECTION, post.id), 'comments'))).size
				: 0
		}))
	);
}

// 🔹 Post Edits / Deletion
export async function deleteForumThread(threadId: string) {
	await deleteDoc(doc(db, POSTS_COLLECTION, threadId));
}

export async function updateForumThread(threadId: string, newTitle: string, newContent: string) {
	await updateDoc(doc(db, POSTS_COLLECTION, threadId), {
		title: newTitle,
		content: newContent,
		updatedAt: serverTimestamp()
	});
}

// 🔹 Likes
export async function likeForumPost(threadId: string, userId: string) {
	await toggleLike(POSTS_COLLECTION, threadId, userId);
}

// 🔹 Comments (CRUD)
export async function getForumComments(threadId: string): Promise<ForumComment[]> {
	return getComments(forumCommentPath(threadId));
}

export async function addForumComment(
	threadId: string,
	comment: Omit<ForumComment, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy'>
) {
	return addComment(forumCommentPath(threadId), comment);
}

export async function editForumComment(threadId: string, commentId: string, newText: string) {
	await editComment(`${forumCommentPath(threadId)}/${commentId}`, newText);
}

export async function deleteForumComment(threadId: string, commentId: string) {
	await deleteComment(`${forumCommentPath(threadId)}/${commentId}`);
}

export async function likeForumComment(threadId: string, commentId: string, userId: string) {
	await toggleLike(forumCommentPath(threadId), commentId, userId);
}
