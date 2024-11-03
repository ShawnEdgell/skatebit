// src/lib/types/posts/Post.ts

export interface Post {
	id: string;
	title: string;
	description: string;
	fileURL: string;
	filePath: string;
	userId: string;
	userName: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	userPhotoURL: string | null;
}

export interface Comment {
	id: string;
	content: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	userId: string;
	userName: string;
}
