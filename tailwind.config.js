// tailwind.config.js
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit', // Enable Just-In-Time mode
	content: ['./src/**/*.{html,js,svelte,ts}', './src/app.html'], // Purge unused styles
	theme: {
		extend: {}
	},
	plugins: [daisyui, typography, aspectRatio],
	daisyui: {
		themes: ['light', 'dark'] // Add light and dark themes if needed
	}
};
