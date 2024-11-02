// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { YOUTUBE_API_KEY } from '$env/static/private';
import type { YouTubeAPIResponseItem, YouTubeAPIResponse, YouTubeItem } from '$lib';
import { firestore } from '$lib/firebaseAdmin'; // Import Firestore instance

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const CHANNELS = [
	{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist' }, // Skater XL
	{ id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', type: 'playlist' }, // Session
	{ id: 'UCSBQJEWTWOUCO65xvoDfljw', type: 'channel' } // Skate
];

// Firestore collection and document ID for caching
const CACHE_COLLECTION = 'youtubeCache';
const CACHE_DOCUMENT = 'cacheAllVideos';

// Cache duration: 1 hour in milliseconds
const CACHE_DURATION = 60 * 60 * 1000;

// Function to map API response to YouTubeItem format
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

// Function to fetch YouTube data for each channel or playlist
const fetchYouTubeData = async (id: string, type: string): Promise<YouTubeItem[]> => {
	const endpoint = type === 'playlist' ? 'playlistItems' : 'search';
	const params =
		type === 'playlist'
			? `playlistId=${id}&part=snippet&maxResults=5`
			: `channelId=${id}&order=date&type=video&videoDuration=medium&part=snippet&maxResults=5`;
	const url = `${YOUTUBE_API_BASE}/${endpoint}?${params}&key=${YOUTUBE_API_KEY}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			// Extract error message from response
			const errorData = await response.json();
			const errorMessage = errorData.error?.message || response.statusText;
			throw new Error(`Error ${response.status}: ${errorMessage}`);
		}

		const data = (await response.json()) as YouTubeAPIResponse;
		return mapYouTubeData(data, type, id);
	} catch (error) {
		console.error(`Failed to fetch data for ${id}:`, error);
		return []; // Return empty array on failure to prevent throwing
	}
};

// Function to get cached data from Firestore
const getCachedData = async (): Promise<YouTubeItem[] | null> => {
	try {
		const docRef = firestore.collection(CACHE_COLLECTION).doc(CACHE_DOCUMENT);
		const doc = await docRef.get();
		if (!doc.exists) {
			return null;
		}

		const data = doc.data();
		if (!data) {
			return null;
		}

		const { timestamp, videos } = data;

		// Check if cache is still valid
		if (Date.now() - timestamp < CACHE_DURATION) {
			return videos as YouTubeItem[];
		} else {
			return null; // Cache is stale
		}
	} catch (error) {
		console.error('Error accessing cache:', error);
		return null; // On error, treat as no cache
	}
};

// Function to set cached data in Firestore
const setCachedData = async (videos: YouTubeItem[]): Promise<void> => {
	try {
		const docRef = firestore.collection(CACHE_COLLECTION).doc(CACHE_DOCUMENT);
		await docRef.set({
			timestamp: Date.now(),
			videos
		});
	} catch (error) {
		console.error('Error setting cache:', error);
		// Proceed without caching if setting cache fails
	}
};

// Load function for SvelteKit page with Firebase caching
export const load: PageServerLoad = async () => {
	if (!YOUTUBE_API_KEY) {
		console.error('API key is missing');
		return { videos: [] };
	}

	// Attempt to retrieve cached data
	const cachedVideos = await getCachedData();

	if (cachedVideos) {
		console.log('Serving videos from Firestore cache');
		return { videos: cachedVideos };
	}

	// If no valid cache, fetch new data
	try {
		console.log('Fetching new videos from YouTube API');
		const videoResults = await Promise.all(
			CHANNELS.map(({ id, type }) => fetchYouTubeData(id, type))
		);
		const videos = videoResults
			.flat()
			.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

		// Update Firestore cache
		await setCachedData(videos);
		console.log('Fetched new videos and updated Firestore cache');

		return { videos };
	} catch (error) {
		console.error('Error fetching videos:', error);
		return { videos: [] };
	}
};
