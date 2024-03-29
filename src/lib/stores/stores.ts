// In $lib/stores/stores.ts
import { writable } from 'svelte/store';

export const currentTileIndex = writable(0); 

export const stats = writable([]);
export const loading = writable(false);
export const title = writable('');
export const description = writable('');
export const isFormValid = writable(false);