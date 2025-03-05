// +page.server.ts
import type { PageServerLoad } from './$types';
import { PUBLIC_YOUTUBE_API_KEY } from '$env/static/public';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Define an interface for a YouTube playlist item returned from the API
interface YouTubePlaylistItem {
	snippet: {
		title: string;
		publishedAt?: string; // Make it optional if needed
		description: string;
		resourceId?: {
			videoId: string;
		};
	};
	// The id can either be a string or an object containing a videoId
	id: string | { videoId: string };
}

// Your app's YouTube item type (used by your VideoItem component)
import type { YouTubeItem } from '$lib/types/YoutubeTypes';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
// Only using the Skater XL playlist now
const SOURCES = [{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist' }];
const MAX_RESULTS = 5;

// Cache configuration
const CACHE_COLLECTION = 'youtubeCache';
const CACHE_DOC = 'skaterXLVideos';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Removes any content starting with "Check Out Skater XL on:" from the description.
 */
function cleanDescription(desc: string): string {
	return desc.replace(/Check Out Skater XL on:[\s\S]*/g, '').trim();
}

// Fetch videos from a playlist and type the response properly
async function fetchPlaylistVideos(playlistId: string): Promise<YouTubePlaylistItem[]> {
	const res = await fetch(
		`${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${MAX_RESULTS}&key=${PUBLIC_YOUTUBE_API_KEY}`
	);
	const data = await res.json();
	return data.items || [];
}

// Normalize video data to match the expected structure for VideoItem.svelte
function normalizeVideo(video: YouTubePlaylistItem): YouTubeItem {
	const snippet = video.snippet;
	const videoId =
		snippet.resourceId?.videoId ?? (typeof video.id === 'object' ? video.id.videoId : video.id);
	return {
		title: snippet.title,
		publishedAt: snippet.publishedAt,
		description: cleanDescription(snippet.description || ''),
		videoId: videoId
	};
}

// Fetch fresh videos from YouTube and return a sorted array of YouTubeItem
async function fetchYouTubeVideos(): Promise<YouTubeItem[]> {
	const results = await Promise.all(SOURCES.map((source) => fetchPlaylistVideos(source.id)));
	const allVideos = results.flat().map(normalizeVideo);
	// Sort videos by published date (newest first). If publishedAt is undefined, treat as 0.
	allVideos.sort((a, b) => {
		const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
		const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
		return dateB - dateA;
	});
	return allVideos;
}

export const load: PageServerLoad = async () => {
	let videos: YouTubeItem[] = [];
	try {
		// Reference the cache document in your Firestore collection "youtubeCache"
		const cacheRef = doc(db, CACHE_COLLECTION, CACHE_DOC);
		const cacheSnap = await getDoc(cacheRef);
		let useCache = false;
		if (cacheSnap.exists()) {
			const cacheData = cacheSnap.data();
			// Use the cached data if it's still fresh
			if (cacheData.lastUpdated && Date.now() - cacheData.lastUpdated < CACHE_DURATION) {
				videos = cacheData.videos;
				useCache = true;
			}
		}
		// If no fresh cache exists, fetch new data and update Firestore
		if (!useCache) {
			const freshVideos = await fetchYouTubeVideos();
			videos = freshVideos;
			await setDoc(cacheRef, { videos: freshVideos, lastUpdated: Date.now() });
		}
	} catch (e) {
		console.error(e);
		// Optionally, you can include an error property in the returned data.
	}
	return { videos };
};
