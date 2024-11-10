// src/lib/types/comments/Comment.ts

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
