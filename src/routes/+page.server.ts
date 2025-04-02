import type { PageServerLoad } from './$types';
import { getCachedYouTubeVideos } from '$lib/firebase/youtube';

export const load: PageServerLoad = async () => {
	const videos = await getCachedYouTubeVideos();
	return { videos };
};
