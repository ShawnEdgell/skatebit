// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { YOUTUBE_API_KEY } from '$env/static/private';
import type { YouTubeAPIResponseItem, YouTubeAPIResponse, YouTubeItem } from '$lib';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const CHANNELS = [
	{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist' }, // Skater XL
	{ id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', type: 'playlist' }, // Session
	{ id: 'UCSBQJEWTWOUCO65xvoDfljw', type: 'channel' } // Skate
];

// Define cache interface
interface CacheEntry {
	timestamp: number;
	data: YouTubeItem[];
}

// Initialize cache
let cache: CacheEntry | null = null;

// Constants
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

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

		const data = (await response.json()) as YouTubeAPIResponse;
		return mapYouTubeData(data, type, id);
	} catch (error) {
		console.error(`Failed to fetch data for ${id}:`, error);
		return [];
	}
};

// Load function for SvelteKit page with caching
export const load: PageServerLoad = async () => {
	if (!YOUTUBE_API_KEY) {
		console.error('API key is missing');
		return { videos: [] };
	}

	const now = Date.now();

	// Check if cache is valid
	if (cache && now - cache.timestamp < CACHE_DURATION) {
		console.log('Serving videos from cache');
		return { videos: cache.data };
	}

	// Fetch new data
	try {
		const videoResults = await Promise.all(
			CHANNELS.map(({ id, type }) => fetchYouTubeData(id, type))
		);
		const videos = videoResults
			.flat()
			.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

		// Update cache
		cache = {
			timestamp: now,
			data: videos
		};

		console.log('Fetched new videos and updated cache');
		return { videos };
	} catch (error) {
		console.error('Error fetching videos:', error);
		return { videos: [] };
	}
};
