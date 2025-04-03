// src/lib/api/modio.ts
import { MODIO_DOMAIN } from '$env/static/private';

console.log('MODIO_DOMAIN:', MODIO_DOMAIN); // Verify it's set

export async function fetchModsByCategory(
	apiKey: string,
	gameId: string,
	category: string,
	limit: number = 10
) {
	const domain = MODIO_DOMAIN;
	// Using "tags-in" to filter by category.
	const url = `https://${domain}/v1/games/${gameId}/mods?api_key=${apiKey}&tags-in=${encodeURIComponent(category)}&_sort=-date_added&_limit=${limit}`;
	const res = await fetch(url);
	if (!res.ok) {
		const errorText = await res.text();
		console.error('mod.io API error:', res.status, errorText);
		throw new Error(`Failed to fetch mod data: ${res.status}`);
	}
	const data = await res.json();
	return data.data;
}
