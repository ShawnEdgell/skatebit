export function extractYoutubeId(url: string): string | null {
	const match = url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
	return match ? match[1] : null;
}
