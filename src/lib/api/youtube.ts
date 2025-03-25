import type { YouTubeItem } from '$lib/types/youtube';
import { PUBLIC_YOUTUBE_API_KEY } from '$env/static/public';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

const CHANNELS = [
	{ id: 'UUpBQRZl7apZt_LQXKgqKQiQ', type: 'playlist', label: 'Skater XL' },
	{ id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm', type: 'playlist', label: 'Session' },
	{ id: 'UCSBQJEWTWOUCO65xvoDfljw', type: 'channel', label: 'Skate' }
];

interface YouTubeAPIItem {
	id: string | { videoId: string };
	snippet: {
		title: string;
		publishedAt?: string;
		description: string;
		resourceId?: { videoId: string };
	};
}

function cleanDescription(desc: string, source: string): string {
	let cleaned = desc;
	cleaned = cleaned.replace(/Check Out Skater XL on:[\s\S]*/g, '').trim();

	if (source === 'Session') {
		cleaned = cleaned.replace(
			/^Play Session:\s*Skate Sim now:\s*https:\/\/store\.steampowered\.com\/app\/861650\/Session_Skate_Sim\/\s*Dobrý den,\s*/i,
			''
		);
		cleaned = cleaned.replace(/Follow us on Twitter:.*$/is, '').trim();
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
		params = `playlistId=${id}&part=snippet&maxResults=10`;
	} else {
		params = `channelId=${id}&order=date&type=video&part=snippet&maxResults=10`;
	}

	const url = `${YOUTUBE_API_BASE}/${type === 'playlist' ? 'playlistItems' : 'search'}?${params}&key=${PUBLIC_YOUTUBE_API_KEY}`;

	try {
		const res = await fetch(url);
		const data = await res.json();
		if (!data.items) return [];

		return (data.items as YouTubeAPIItem[])
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
				} satisfies YouTubeItem;
			})
			.filter((video) => {
				if (video.source === 'Session' && video.title.toUpperCase().includes('ANZ')) {
					return false;
				}
				return true;
			});
	} catch (error) {
		console.error(`Failed to fetch videos for ${label}:`, error);
		return [];
	}
}

export async function fetchYouTubeVideos(): Promise<YouTubeItem[]> {
	const results = await Promise.all(CHANNELS.map((source) => fetchVideosForSource(source)));
	const allVideos = results.flat();
	allVideos.sort((a, b) => {
		const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
		const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
		return dateB - dateA;
	});
	return allVideos;
}
