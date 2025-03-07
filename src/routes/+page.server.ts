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
 * - For Session: Removes the unwanted line (exact copy-pasted content), any trailing social links,
 *   and any trailing content starting with a long line of dashes.
 * - For Skate (or others): Leaves the description unchanged.
 */
function cleanDescription(desc: string, source: string): string {
	let cleaned = desc;

	// Always remove Skater XL specific text if it exists.
	cleaned = cleaned.replace(/Check Out Skater XL on:[\s\S]*/g, '').trim();

	if (source === 'Session') {
		// Remove the exact unwanted line by matching it at the beginning.
		cleaned = cleaned.replace(
			/^Play Session:\s*Skate Sim now:\s*https:\/\/store\.steampowered\.com\/app\/861650\/Session_Skate_Sim\/\s*Dobrý den,\s*/i,
			''
		);
		// Remove any trailing social links starting with "Follow us on Twitter:".
		cleaned = cleaned.replace(/Follow us on Twitter:.*$/is, '').trim();
		// Additionally, remove any trailing content starting with a long line of dashes.
		cleaned = cleaned.replace(/-{10,}[\s\S]*$/g, '').trim();
	}

	return cleaned;
}

async function fetchVideosForSource(source: {
	id: string;
	type: string;
	label: string;
}): Promise<YouTubeItem[]> {
	const { id, type, label } = source;
	let params = '';
	if (type === 'playlist') {
		// For playlists, we still fetch 5 videos.
		params = `playlistId=${id}&part=snippet&maxResults=10`;
	} else {
		// For channel type (e.g. Skate), limit to 5 videos.
		params = `channelId=${id}&order=date&type=video&part=snippet&maxResults=10`;
	}
	const url = `${YOUTUBE_API_BASE}/${type === 'playlist' ? 'playlistItems' : 'search'}?${params}&key=${PUBLIC_YOUTUBE_API_KEY}`;

	try {
		const res = await fetch(url);
		const data = await res.json();
		if (!data.items) return [];
		return (
			(data.items as YouTubeAPIItem[])
				.map((item) => {
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
				})
				// Remove any Session video with "ANZ" in the title (case-insensitive)
				.filter((video) => {
					if (video.source === 'Session' && video.title.toUpperCase().includes('ANZ')) {
						return false;
					}
					return true;
				})
		);
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
