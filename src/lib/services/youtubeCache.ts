// src/lib/services/youtubeCache.ts

import { firestore } from '$lib/firebaseAdmin';
import { CACHE_COLLECTION, CACHE_DOCUMENT, CACHE_DURATION } from '$lib/config/youtube';
import type { YouTubeItem } from '$lib';

/**
 * Retrieves cached YouTube videos from Firestore.
 * @returns An array of YouTubeItem if cache is valid, otherwise null.
 */
export const getCachedData = async (): Promise<YouTubeItem[] | null> => {
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

/**
 * Caches YouTube videos data in Firestore.
 * @param videos - The array of YouTubeItem to cache.
 */
export const setCachedData = async (videos: YouTubeItem[]): Promise<void> => {
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
