// src/lib/config/youtube.ts

export const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
export const CHANNELS = [
	{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist' }, // Skater XL
	{ id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', type: 'playlist' }, // Session
	{ id: 'UCSBQJEWTWOUCO65xvoDfljw', type: 'channel' } // Skate
];
export const CACHE_COLLECTION = 'youtubeCache';
export const CACHE_DOCUMENT = 'cacheAllVideos';
export const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
