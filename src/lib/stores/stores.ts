// In $lib/stores/index.js or similar
import { writable } from 'svelte/store';

export const currentTileIndex = writable(0); // Default to the first tab
