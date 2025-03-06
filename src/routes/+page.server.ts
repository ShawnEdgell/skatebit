// +page.server.ts
import type { PageServerLoad } from './$types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PUBLIC_YOUTUBE_API_KEY } from '$env/static/public';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const CACHE_COLLECTION = 'youtubeCache';
const CACHE_DOC = 'cacheAllVideos';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Define channels/sources. Easily add or remove channels by updating this array.
const CHANNELS = [
	{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist', label: 'Skater XL' },
	{ id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', type: 'playlist', label: 'Session' },
	{ id: 'UCSBQJEWTWOUCO65xvoDfljw', type: 'channel', label: 'Skate' }
];

export interface YouTubeItem {
	title: string;
	publishedAt?: string;
	description?: string;
	videoId: string;
	source: string; // Added to identify the origin
}

/**
 * Interface for a YouTube API response item.
 */
interface YouTubeAPIItem {
	id: string | { videoId: string };
	snippet: {
		title: string;
		publishedAt?: string;
		description: string;
		resourceId?: { videoId: string };
	};
}

/**
 * Cleans up the description based on its source.
 * - For Skater XL: Removes text starting with "Check Out Skater XL on:".
 * - For Session: Removes text starting with a sequence of dashes followed by the social links.
 * - For Skate (or others): Leaves the description unchanged.
 */
function cleanDescription(desc: string, source: string): string {
	if (source === 'Skater XL') {
		return desc.replace(/Check Out Skater XL on:[\s\S]*/g, '').trim();
	} else if (source === 'Session') {
		// Remove text starting with 10 or more dashes followed by the fixed text.
		return desc
			.replace(
				/-{10,}\s*For news about our other games and products, you can also follow us on:[\s\S]*/g,
				''
			)
			.trim();
	}
	// For Skate and any other sources, do not trim the description.
	return desc;
}

/**
 * Fetches videos for a given source.
 */
async function fetchVideosForSource(source: {
	id: string;
	type: string;
	label: string;
}): Promise<YouTubeItem[]> {
	const { id, type, label } = source;
	const endpoint = type === 'playlist' ? 'playlistItems' : 'search';
	const params =
		type === 'playlist'
			? `playlistId=${id}&part=snippet&maxResults=5`
			: `channelId=${id}&order=date&type=video&videoDuration=medium&part=snippet&maxResults=5`;
	const url = `${YOUTUBE_API_BASE}/${endpoint}?${params}&key=${PUBLIC_YOUTUBE_API_KEY}`;

	try {
		const res = await fetch(url);
		const data = await res.json();
		if (!data.items) return [];
		return (data.items as YouTubeAPIItem[]).map((item) => {
			const snippet = item.snippet;
			const videoId =
				type === 'playlist'
					? (snippet.resourceId?.videoId ??
						(typeof item.id !== 'string' ? item.id.videoId : item.id))
					: typeof item.id !== 'string'
						? item.id.videoId
						: item.id;
			return {
				title: snippet.title,
				publishedAt: snippet.publishedAt,
				description: cleanDescription(snippet.description || '', label),
				videoId,
				source: label
			} as YouTubeItem;
		});
	} catch (error) {
		console.error(`Failed to fetch videos for ${label}:`, error);
		return [];
	}
}

/**
 * Fetches and aggregates videos from all channels.
 */
async function fetchYouTubeVideos(): Promise<YouTubeItem[]> {
	const results = await Promise.all(CHANNELS.map((source) => fetchVideosForSource(source)));
	const allVideos = results.flat();
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
		const cacheRef = doc(db, CACHE_COLLECTION, CACHE_DOC);
		const cacheSnap = await getDoc(cacheRef);
		let useCache = false;
		if (cacheSnap.exists()) {
			const cacheData = cacheSnap.data();
			if (cacheData.lastUpdated && Date.now() - cacheData.lastUpdated < CACHE_DURATION) {
				videos = cacheData.videos;
				useCache = true;
			}
		}
		if (!useCache) {
			const freshVideos = await fetchYouTubeVideos();
			videos = freshVideos;
			await setDoc(cacheRef, { videos: freshVideos, lastUpdated: Date.now() });
		}
	} catch (e) {
		console.error(e);
	}
	return { videos };
};
