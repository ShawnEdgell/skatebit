import type { Timestamp } from 'firebase/firestore';
import type { YouTubeItem } from '$lib/types/youtube';

export interface ClipPost extends YouTubeItem {
	id?: string;
	uid: string;
	userDisplayName: string;
	userPhotoURL?: string;
	timestamp: Date | Timestamp | null;
	likes: number;
}
