import type { PageServerLoad } from './$types';
import { YOUTUBE_API_KEY } from '$env/static/private';
import type { YouTubeAPIResponseItem, YouTubeAPIResponse, YouTubeItem } from '$lib';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const CHANNELS = [
	{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist' }, // Skater XL
	{ id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', type: 'playlist' }, // Session
	{ id: 'UCSBQJEWTWOUCO65xvoDfljw', type: 'channel' } // Skate
];

// Simplified function to map API response to YouTubeItem format
const mapYouTubeData = (data: YouTubeAPIResponse, type: string, id: string): YouTubeItem[] =>
	data.items.map((item: YouTubeAPIResponseItem) => ({
		title: item.snippet.title,
		publishedAt: item.snippet.publishedAt,
		description: item.snippet.description,
		videoId:
			type === 'playlist' ? (item.snippet.resourceId?.videoId ?? '') : (item.id?.videoId ?? ''),
		playlistId: type === 'playlist' ? id : '',
		showFullDescription: false
	})) || [];

// Fetches YouTube data for each channel or playlist
const fetchYouTubeData = async (id: string, type: string): Promise<YouTubeItem[]> => {
	const endpoint = type === 'playlist' ? 'playlistItems' : 'search';
	const params =
		type === 'playlist'
			? `playlistId=${id}`
			: `channelId=${id}&order=date&type=video&videoDuration=medium`;
	const url = `${YOUTUBE_API_BASE}/${endpoint}?part=snippet&${params}&maxResults=5&key=${YOUTUBE_API_KEY}`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Error: ${response.statusText}`);

		const data = await response.json();
		return mapYouTubeData(data, type, id);
	} catch (error) {
		console.error(`Failed to fetch data for ${id}:`, error);
		return [];
	}
};

// Load function for SvelteKit page
export const load: PageServerLoad = async () => {
	if (!YOUTUBE_API_KEY) throw new Error('API key is missing');

	const videoResults = await Promise.all(
		CHANNELS.map(({ id, type }) => fetchYouTubeData(id, type))
	);
	const videos = videoResults
		.flat()
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

	return { videos };
};
