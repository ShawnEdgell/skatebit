// src/lib/types/discord/DiscordTypes.ts

/**
 * Represents a Discord link with metadata.
 */
export interface DiscordLink {
	/**
	 * The name of the Discord community.
	 */
	name: string;

	/**
	 * The invite link to the Discord community.
	 */
	link: string;

	/**
	 * The owner or creator of the Discord community.
	 */
	owner: string; // Changed from DiscordLinkOwner to string
}

/**
 * Represents a category containing multiple Discord links.
 */
export interface Category {
	title: string;
	data: DiscordLink[];
	description: string;
}

/**
 * Represents a downloadable link for a mod.
 */
export interface DownloadLink {
	url: string;
	label: string;
}

/**
 * Represents a mod with detailed information.
 */
export interface Mod {
	title: string;
	authors: string[];
	workingVersion: string;
	keybind: string;
	features: string[];
	note: string;
	downloadLinks: DownloadLink[];
}
