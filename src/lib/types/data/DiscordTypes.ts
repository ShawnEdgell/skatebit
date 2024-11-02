export interface DiscordLink {
	name: string;
	link: string;
	owner: string;
}

export interface Category {
	title: string;
	data: DiscordLink[];
	description: string;
}

export interface DownloadLink {
	url: string;
	label: string;
}

export interface Mod {
	title: string;
	authors: string[];
	workingVersion: string;
	keybind: string;
	features: string[];
	note: string;
	downloadLinks: DownloadLink[];
}
