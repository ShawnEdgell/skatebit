// src/lib/utils/clipsUtils.ts
import { getClipPosts } from '$lib/firebase/clips';
import { getCurrentWeekId } from './week';

export async function getCurrentWeekClips(sortBy: 'latest' | 'popular' = 'latest') {
	const weekId = getCurrentWeekId();
	return await getClipPosts(sortBy, weekId);
}
