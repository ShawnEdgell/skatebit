import type { YouTubeItem } from './youtube';
import type { Timestamp } from 'firebase/firestore';

export interface ClipPost extends YouTubeItem {
	id?: string;
	uid: string;
	userDisplayName: string;
	userPhotoURL?: string;
	timestamp: Timestamp | Date | null;
	likes: number;
}
