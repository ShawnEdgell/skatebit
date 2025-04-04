import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { ModsData } from '$lib/types/modio';
import { db } from '$lib/firebase/init';
import { fetchModsByCategory } from '$lib/api/modio';
import { MODIO_API_KEY } from '$env/static/private';

const CACHE_COLLECTION = 'modCache';
const CACHE_DOC = 'skaterxlMods';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function getCachedModData(): Promise<ModsData> {
	const cacheRef = doc(db, CACHE_COLLECTION, CACHE_DOC);
	const cacheSnap = await getDoc(cacheRef);
	let useCache = false;
	let data: ModsData = { gearMods: [], mapMods: [], scriptMods: [] };

	if (cacheSnap.exists()) {
		const cacheData = cacheSnap.data();
		if (cacheData.lastUpdated && Date.now() - cacheData.lastUpdated < CACHE_DURATION) {
			data = cacheData.modsData;
			useCache = true;
			console.log('Using cached mod.io data');
		}
	}

	if (!useCache) {
		console.log('Fetching fresh mod.io data');
		const gameId = '629'; // Numeric game ID for Skater XL
		// Run API calls concurrently for each category.
		const [gearMods, mapMods, scriptMods] = await Promise.all([
			fetchModsByCategory(MODIO_API_KEY, gameId, 'Gear', 10),
			fetchModsByCategory(MODIO_API_KEY, gameId, 'Map', 10),
			fetchModsByCategory(MODIO_API_KEY, gameId, 'Script', 10)
		]);
		data = { gearMods, mapMods, scriptMods };
		await setDoc(cacheRef, { modsData: data, lastUpdated: Date.now() });
		console.log('Updated cache with fresh mod.io data');
	}

	return data;
}
