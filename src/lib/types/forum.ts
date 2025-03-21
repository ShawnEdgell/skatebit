import type { Timestamp } from 'firebase/firestore';

export interface ForumPost {
	id: string;
	title: string;
	content: string;
	authorId: string;
	authorName: string; // uploader's display name
	createdAt: Timestamp | Date | null;
	updatedAt: Timestamp | Date | null;
}

export interface ForumComment {
	id: string;
	text: string;
	authorId: string;
	authorName: string; // commenter's display name
	createdAt: Timestamp | Date | null;
	updatedAt: Timestamp | Date | null;
}
