// src/lib/api/youtube.ts

import { YOUTUBE_API_BASE } from '$lib/config/youtube';
import type { YouTubeAPIResponse, YouTubeItem } from '$lib';
import { YOUTUBE_API_KEY } from '$env/static/private';

/**
 * Fetches YouTube data for a given ID and type.
 * @param id - The channel or playlist ID.
 * @param type - The type ('channel' or 'playlist').
 * @returns An array of YouTubeItem.
 */
export const fetchYouTubeData = async (id: string, type: string): Promise<YouTubeItem[]> => {
	const endpoint = type === 'playlist' ? 'playlistItems' : 'search';
	const params =
		type === 'playlist'
			? `playlistId=${id}&part=snippet&maxResults=5`
			: `channelId=${id}&order=date&type=video&videoDuration=medium&part=snippet&maxResults=5`;
	const url = `${YOUTUBE_API_BASE}/${endpoint}?${params}&key=${YOUTUBE_API_KEY}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
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

/**
 * Maps YouTube API response data to YouTubeItem format.
 * @param data - The YouTube API response data.
 * @param type - The type ('channel' or 'playlist').
 * @param id - The channel or playlist ID.
 * @returns An array of YouTubeItem.
 */
const mapYouTubeData = (data: YouTubeAPIResponse, type: string, id: string): YouTubeItem[] =>
	data.items.map((item) => ({
		title: item.snippet.title,
		publishedAt: item.snippet.publishedAt,
		description: item.snippet.description,
		videoId:
			type === 'playlist' ? (item.snippet.resourceId?.videoId ?? '') : (item.id?.videoId ?? ''),
		playlistId: type === 'playlist' ? id : '',
		showFullDescription: false
	})) || [];
