import type { PageServerLoad } from './$types';
import { YOUTUBE_API_KEY } from '$env/static/private';

interface YouTubePlaylistItem {
	snippet: {
		title: string;
		publishedAt: string;
		description: string;
		resourceId: {
			videoId: string;
		};
	};
}

export const load: PageServerLoad = async () => {
	if (!YOUTUBE_API_KEY) {
		throw new Error('API key is missing');
	}

	const playlistIds = [
		'UUpBQRZl7apZt_LQXKgqKQiQ', // Skater XL
		'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', // Session
		'UUSBQJEWTWOUCO65xvoDfljw' // Skate.
	];

	const fetchVideos = async (playlistId: string) => {
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=5&key=${YOUTUBE_API_KEY}`
		);
		const data = await res.json();
		return (
			data.items?.map((item: YouTubePlaylistItem) => ({
				title: item.snippet.title,
				publishedAt: item.snippet.publishedAt,
				description: item.snippet.description,
				videoId: item.snippet.resourceId.videoId, // Fixed typo here
				playlistId,
				showFullDescription: false,
				iframeLoaded: false
			})) || []
		);
	};

	const videosArrays = await Promise.all(playlistIds.map(fetchVideos));
	const videos = videosArrays
		.flat()
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

	return { videos };
};
