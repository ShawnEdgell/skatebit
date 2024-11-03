// src/lib/types/youtube/YouTubeTypes.ts

/**
 * Represents the snippet information of a YouTube video.
 */
export interface YouTubeSnippet {
	title: string;
	publishedAt: string;
	description: string;
	resourceId?: { videoId: string };
}

/**
 * Represents an individual item in the YouTube API response.
 */
export interface YouTubeAPIResponseItem {
	snippet: YouTubeSnippet;
	id?: { videoId: string };
}

/**
 * Represents the overall YouTube API response structure.
 */
export interface YouTubeAPIResponse {
	items: YouTubeAPIResponseItem[];
}

/**
 * Represents the transformed YouTube video data used within the application.
 */
export interface YouTubeItem {
	title: string;
	publishedAt: string;
	description: string;
	videoId: string;
	playlistId: string;
	showFullDescription: boolean;
}
