export interface DiscordLink {
	name: string;
	owner: string;
	link: string;
}

export interface Category {
	title: string;
	description: string;
	data: DiscordLink[];
}
