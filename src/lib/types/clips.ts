import type { Timestamp } from 'firebase/firestore';
import type { YouTubeItem } from '$lib/types/youtube';

export interface ClipPost extends YouTubeItem {
	id?: string;
	uid: string;
	userDisplayName: string;
	userPhotoURL?: string;
	timestamp: Date | Timestamp | null;
	likes: number;
	likedBy: string[];
	weekId: string;
	commentsCount?: number;
}

export interface ClipComment {
	id?: string;
	clipId: string;
	text: string;
	authorId: string;
	authorName: string;
	authorAvatar?: string;
	createdAt: Date | Timestamp | null;
	updatedAt?: Date | Timestamp | null;
	likes: number;
	likedBy: string[];
}
