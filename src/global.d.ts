/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

// anything imported with "?...&as=picture" becomes a string of HTML (<picture>…</picture>)
declare module '*?*as=picture' {
	const html: string;
	export default html;
}
