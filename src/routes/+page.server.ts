// +page.server.ts
import type { PageServerLoad } from './$types';
import { YOUTUBE_API_KEY } from '$env/static/private';

interface YouTubePlaylistItem {
	snippet: {
		title: string;
		publishedAt: string;
		description: string;
		resourceId: {
			videoId: string;
		};
	};
}

interface YouTubeSearchResult {
	id: {
		videoId: string;
	};
	snippet: {
		title: string;
		publishedAt: string;
		description: string;
	};
}

interface Video {
	title: string;
	publishedAt: string;
	description: string;
	videoId: string;
	playlistId?: string; // Optional for search results
}

export const load: PageServerLoad = async () => {
	if (!YOUTUBE_API_KEY) {
		throw new Error('API key is missing');
	}

	// Define the playlist IDs for Skater XL and Session
	const playlistIds = [
		'UUpBQRZl7apZt_LQXKgqKQiQ', // Skater XL
		'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm' // Session
	];

	// Define the channel ID for Skate.
	const skateChannelId = 'UCSBQJEWTWOUCO65xvoDfljw';

	// Function to fetch videos using the playlistItems endpoint
	const fetchFromPlaylist = async (playlistId: string): Promise<Video[]> => {
		try {
			const res = await fetch(
				`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=5&key=${YOUTUBE_API_KEY}`
			);

			if (!res.ok) {
				console.error(`Failed to fetch videos for playlist ${playlistId}: ${res.statusText}`);
				return [];
			}

			const data = await res.json();

			return (
				data.items?.map((item: YouTubePlaylistItem) => ({
					title: item.snippet.title,
					publishedAt: item.snippet.publishedAt,
					description: item.snippet.description,
					videoId: item.snippet.resourceId.videoId,
					playlistId: playlistId
				})) || []
			);
		} catch (error) {
			console.error(`Error fetching videos for playlist ${playlistId}:`, error);
			return [];
		}
	};

	// Function to fetch videos using the search endpoint
	const fetchFromSearch = async (channelId: string): Promise<Video[]> => {
		try {
			const res = await fetch(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=5&type=video&videoDuration=medium&key=${YOUTUBE_API_KEY}`
			);

			if (!res.ok) {
				console.error(`Failed to fetch videos for channel ${channelId}: ${res.statusText}`);
				return [];
			}

			const data = await res.json();

			return (
				data.items?.map((item: YouTubeSearchResult) => ({
					title: item.snippet.title,
					publishedAt: item.snippet.publishedAt,
					description: item.snippet.description,
					videoId: item.id.videoId
				})) || []
			);
		} catch (error) {
			console.error(`Error fetching videos for channel ${channelId}:`, error);
			return [];
		}
	};

	// Fetch videos concurrently
	const [playlistVideos, searchVideos] = await Promise.all([
		Promise.all(playlistIds.map(fetchFromPlaylist)),
		fetchFromSearch(skateChannelId)
	]);

	// Combine all videos into a single array
	const videos = [...playlistVideos.flat(), ...searchVideos].sort(
		(a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
	);

	return { videos };
};
