import { db } from './init';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { YouTubeItem } from '$lib/types/youtube';
import { fetchYouTubeVideos } from '$lib/api/youtube';

const CACHE_COLLECTION = 'youtubeCache';
const CACHE_DOC = 'cacheAllVideos';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function getCachedYouTubeVideos(): Promise<YouTubeItem[]> {
	const cacheRef = doc(db, CACHE_COLLECTION, CACHE_DOC);
	const cacheSnap = await getDoc(cacheRef);

	let useCache = false;
	let videos: YouTubeItem[] = [];

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

	return videos;
}
