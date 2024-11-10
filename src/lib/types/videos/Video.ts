// src/lib/types/videos/Video.ts

export interface Video {
	id: string;
	title: string;
	description: string;
	youtubeURL: string;
	userId: string;
	userName: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	userPhotoURL: string | null;
}
