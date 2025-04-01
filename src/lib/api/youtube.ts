// src/lib/api/youtube.ts
import type { YouTubeItem } from '$lib/types/youtube';
import { PUBLIC_YOUTUBE_API_KEY } from '$env/static/public';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

const CHANNELS = [
	{
		label: 'Skater XL',
		type: 'playlist',
		id: 'UUpBQRZl7apZt_LQXKgqKQiQ',
		channelId: 'UC5I5kzJACGeCqyuJJlU1x5w'
	},
	{
		label: 'Session',
		type: 'playlist',
		id: 'PLWmRSsZZ1RCW-0uQWKlCAiGZVnIaRYaTm',
		channelId: 'UCfu0bEJS76oDQfxu4tJb54A'
	},
	{
		label: 'Skate',
		type: 'channel',
		id: 'UCSBQJEWTWOUCO65xvoDfljw',
		channelId: 'UCSBQJEWTWOUCO65xvoDfljw'
	}
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

async function fetchChannelDetails(channelId: string) {
	const url = `${YOUTUBE_API_BASE}/channels?part=snippet&id=${channelId}&key=${PUBLIC_YOUTUBE_API_KEY}`;
	console.log('Fetching channel details from:', url);
	try {
		const res = await fetch(url);
		const data = await res.json();
		if (!data.items || data.items.length === 0) {
			console.warn(`No channel details found for ID: ${channelId}`, data);
			return {
				channelTitle: 'Unknown Channel',
				channelAvatar: 'https://via.placeholder.com/40'
			};
		}
		const snippet = data.items[0].snippet;
		return {
			channelTitle: snippet?.title ?? 'Unknown Channel',
			channelAvatar: snippet?.thumbnails?.default?.url ?? 'https://via.placeholder.com/40'
		};
	} catch (error) {
		console.error(`Error fetching channel details for ${channelId}:`, error);
		return {
			channelTitle: 'Unknown Channel',
			channelAvatar: 'https://via.placeholder.com/40'
		};
	}
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
	console.log('Fetching videos for', label, 'from:', url);

	try {
		const res = await fetch(url);
		const data = await res.json();
		if (!data.items) return [];

		// Get channel ID from the first video
		const firstSnippet = data.items[0]?.snippet;
		const detectedChannelId = firstSnippet?.channelId;

		if (!detectedChannelId) {
			console.warn(`Could not detect channelId from first video for ${label}`);
		}

		const channelMeta = detectedChannelId
			? await fetchChannelDetails(detectedChannelId)
			: {
					channelTitle: 'Unknown Channel',
					channelAvatar: 'https://via.placeholder.com/40'
				};

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
					source: label,
					channelId: detectedChannelId,
					channelTitle: channelMeta.channelTitle,
					channelAvatar: channelMeta.channelAvatar
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

	// Sort by newest first
	allVideos.sort((a, b) => {
		const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
		const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
		return dateB - dateA;
	});

	// ✅ Limit to the 10 most recent
	return allVideos.slice(0, 10);
}
