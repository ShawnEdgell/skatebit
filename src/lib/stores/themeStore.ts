// src/lib/stores/themeStore.ts
import { writable } from 'svelte/store';

const storedTheme = localStorage.getItem('theme') || 'dark';
export const theme = writable(storedTheme);

theme.subscribe((value) => {
	document.documentElement.setAttribute('data-theme', value);
	localStorage.setItem('theme', value);
});
