// src/lib/services/youtubeService.ts

import { CHANNELS } from '$lib/config/youtube';
import type { YouTubeItem } from '$lib';
import { fetchYouTubeData } from '$lib/api/youtube';
import { getCachedData, setCachedData } from '$lib/services/youtubeCache';

/**
 * Fetches YouTube videos, either from cache or the API.
 * @returns An array of YouTubeItem.
 */
export const getYouTubeVideos = async (): Promise<YouTubeItem[]> => {
	// Attempt to retrieve cached data
	const cachedVideos = await getCachedData();

	if (cachedVideos) {
		console.log('Serving videos from Firestore cache');
		return cachedVideos;
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

		return videos;
	} catch (error) {
		console.error('Error fetching videos:', error);
		return [];
	}
};
