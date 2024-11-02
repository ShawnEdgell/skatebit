export interface YouTubeSnippet {
	title: string;
	publishedAt: string;
	description: string;
	resourceId?: { videoId: string };
}

export interface YouTubeAPIResponseItem {
	snippet: YouTubeSnippet;
	id?: { videoId: string };
}

export interface YouTubeAPIResponse {
	items: YouTubeAPIResponseItem[];
}

export interface YouTubeItem {
	title: string;
	publishedAt: string;
	description: string;
	videoId: string;
	playlistId: string;
	showFullDescription: boolean;
}
