// src/routes/mods/+page.server.ts
import { getCachedModData } from '$lib/firebase/modio';
import type { ModsData } from '$lib/types/modio';

export const load = async (): Promise<ModsData> => {
	try {
		const modsData = await getCachedModData();
		return modsData;
	} catch (error) {
		console.error('Error fetching cached mod data:', error);
		return { gearMods: [], mapMods: [], scriptMods: [] };
	}
};
