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
}
