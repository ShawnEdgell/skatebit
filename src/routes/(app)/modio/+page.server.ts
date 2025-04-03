// src/routes/mods/+page.server.ts
import { fetchModsByCategory } from '$lib/api/modio';
import { MODIO_API_KEY } from '$env/static/private';
import type { ModsData, Mod } from '$lib/types/modio';

const gameId = '629';

type CacheData = {
	timestamp: number;
	data: ModsData;
};

let cache: CacheData | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const load = async (): Promise<ModsData> => {
	const now = Date.now();
	if (cache && now - cache.timestamp < CACHE_DURATION) {
		return cache.data;
	}
	try {
		const [gearMods, mapMods, scriptMods] = await Promise.all([
			fetchModsByCategory(MODIO_API_KEY, gameId, 'Gear', 6) as Promise<Mod[]>,
			fetchModsByCategory(MODIO_API_KEY, gameId, 'Map', 6) as Promise<Mod[]>,
			fetchModsByCategory(MODIO_API_KEY, gameId, 'Script', 6) as Promise<Mod[]>
		]);
		const data: ModsData = { gearMods, mapMods, scriptMods };
		cache = { timestamp: now, data };
		return data;
	} catch (error) {
		console.error('Error fetching mods:', error);
		return { gearMods: [], mapMods: [], scriptMods: [] };
	}
};
