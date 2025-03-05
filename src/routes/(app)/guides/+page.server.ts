// +page.server.ts
import type { PageServerLoad } from './$types';
import { videoGuides } from '$lib/data/videoGuides';

export const load: PageServerLoad = async () => {
	// Optionally, you can add your own cache headers in Vercel configuration.
	return { videoGuides };
};
