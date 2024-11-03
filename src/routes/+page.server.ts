// src/routes/+page.server.ts

import type { PageServerLoad } from './$types';
import { getYouTubeVideos } from '$lib/services/youtubeService';

export const load: PageServerLoad = async () => {
	const videos = await getYouTubeVideos();
	return { videos };
};
