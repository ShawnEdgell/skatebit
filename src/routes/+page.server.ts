import type { PageServerLoad } from './$types';
import { YOUTUBE_API_KEY } from '$env/static/private';

interface YouTubeItem {
	title: string;
	publishedAt: string;
	description: string;
	videoId: string;
	playlistId?: string;
}

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

const CHANNELS = [
	{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist' }, // Skater XL
	{ id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', type: 'playlist' }, // Session
	{ id: 'UCSBQJEWTWOUCO65xvoDfljw', type: 'channel' } // Skate
];

const fetchYouTubeData = async (id: string, type: string): Promise<YouTubeItem[]> => {
	const url =
		type === 'playlist'
			? `${YOUTUBE_API_BASE}/playlistItems?part=snippet&playlistId=${id}&maxResults=5&key=${YOUTUBE_API_KEY}`
			: `${YOUTUBE_API_BASE}/search?part=snippet&channelId=${id}&order=date&maxResults=5&type=video&videoDuration=medium&key=${YOUTUBE_API_KEY}`;

	try {
		const res = await fetch(url);
		if (!res.ok) {
			console.error(`Failed to fetch data for ${id}: ${res.statusText}`);
			return [];
		}

		const data = await res.json();
		return (
			data.items?.map(
				(item: {
					snippet: {
						title: string;
						publishedAt: string;
						description: string;
						resourceId?: { videoId: string };
					};
					id?: { videoId: string };
				}) => ({
					title: item.snippet.title,
					publishedAt: item.snippet.publishedAt,
					description: item.snippet.description,
					videoId:
						type === 'playlist' ? item.snippet.resourceId?.videoId ?? '' : item.id?.videoId ?? '',
					playlistId: type === 'playlist' ? id : undefined
				})
			) || []
		);
	} catch (error) {
		console.error(`Error fetching data for ${id}:`, error);
		return [];
	}
};

export const load: PageServerLoad = async () => {
	if (!YOUTUBE_API_KEY) {
		throw new Error('API key is missing');
	}

	const videoPromises = CHANNELS.map(({ id, type }) => fetchYouTubeData(id, type));
	const videoResults = await Promise.all(videoPromises);
	const videos = videoResults
		.flat()
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

	return { videos };
};
