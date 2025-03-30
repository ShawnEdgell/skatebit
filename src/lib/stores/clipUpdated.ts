import { writable } from 'svelte/store';

// Track whether the clip has been updated (submitted or deleted)
export const clipUpdated = writable(false);
// Track if the user has submitted a clip for the current week
export const alreadySubmitted = writable(false);
