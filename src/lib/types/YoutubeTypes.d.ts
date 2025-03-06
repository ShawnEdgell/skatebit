// $lib/types/YoutubeTypes.ts
export interface YouTubeItem {
	title: string;
	publishedAt?: string; // optional
	description?: string; // optional
	videoId: string;
	source: string; // Added to track the origin (Skater XL, Session, Skate, etc.)
}
