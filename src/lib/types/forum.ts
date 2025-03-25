import type { Timestamp } from 'firebase/firestore';

export interface ForumPost {
	id?: string;
	title: string;
	content: string;
	authorId: string;
	authorName: string;
	authorAvatar?: string;
	createdAt: Date | Timestamp | null;
	updatedAt: Date | Timestamp | null;
	likes: number;
	likedBy: string[];
	commentsCount?: number;
}

export interface ForumComment {
	id?: string;
	postId: string;
	text: string;
	authorId: string;
	authorName: string;
	authorAvatar?: string;
	createdAt: Date | Timestamp | null;
	updatedAt?: Date | Timestamp | null;
	likes: number;
	likedBy: string[];
}
