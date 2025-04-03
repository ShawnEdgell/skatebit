export interface UserProfile {
	bio?: string;
	links?: {
		youtube?: string;
		instagram?: string;
		discord?: string;
		tiktok?: string;
	};
	createdAt?: Date;
	updatedAt?: Date;
}
