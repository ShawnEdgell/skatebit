// data.ts

export interface DiscordServer {
	name: string;
	link: string;
	owner: string;
}

export const modderDiscords: DiscordServer[] = [
	{
		name: 'Skater XL Modding Discord',
		link: 'https://discord.gg/uDkSEBKdga',
		owner: 'Brookzee99'
	},
	{ name: "DawgVinci's Discord", link: 'https://discord.gg/GmuBn6UzUh', owner: 'DawgVinci' },
	{ name: "Fro's Discord", link: 'https://discord.gg/6575k57jbk', owner: 'Froquede' },
	{ name: "Guru's Discord", link: 'https://discord.gg/bYK5w53Jg6', owner: 'Guru' }
];

export const mapDiscords: DiscordServer[] = [
	{ name: "Aaronb543's Discord", link: 'https://discord.gg/FfF6aFs4MX', owner: 'Aaronb543' },
	{ name: "B-Row's Discord", link: 'https://discord.gg/DVcJEhPh8M', owner: 'B-Row' },
	{ name: "BigCat's Discord", link: 'https://discord.gg/qkvAMhrswY', owner: 'BigCat' },
	{ name: "Bralunit's Discord", link: 'https://discord.gg/RZbYQjxHdW', owner: 'Bralunit' },
	{ name: "Brookzee99's Discord", link: 'https://discord.gg/b9Dv9atMtZ', owner: 'Brookzee99' },
	{ name: "Doog's Discord", link: 'https://discord.gg/YfadSmDM5J', owner: 'Doog' },
	{
		name: "ElixirDubstep's Discord",
		link: 'https://discord.gg/CnvsyAZ3Dy',
		owner: 'ElixirDubstep'
	},
	{ name: "HeadShopper's Discord", link: 'https://discord.gg/5WsUkXE5Xd', owner: 'HeadShopper' },
	{ name: "Jean-Olive's Discord", link: 'https://discord.gg/PZrYPwBW8P', owner: 'Jean-Olive' },
	{ name: "Koannyc's Discord", link: 'https://discord.gg/A6Xm7jzYgT', owner: 'Koannyc' },
	{ name: "S4shko's Discord", link: 'https://discord.gg/RuyygKEZzy', owner: 'S4shko' },
	{ name: "ValidusTM's Discord", link: 'https://discord.gg/q3ScY7V8rr', owner: 'ValidusTM' },
	{ name: "Whynot_J's Discord", link: 'https://discord.gg/H5r9PU6zj7', owner: 'Whynot_J' }
];

export const gearDiscords: DiscordServer[] = [
	{ name: "Antikz's Discord", link: 'https://discord.gg/pHQWsYG5Mm', owner: 'Antikz' },
	{
		name: "ClutchDidThat's Discord",
		link: 'https://discord.gg/xQMXhCKfQ2',
		owner: 'ClutchDidThat'
	},
	{ name: "Cupid's Discord", link: 'https://discord.gg/jXcU22c2Rz', owner: 'Cupid' },
	{ name: "Hanzo's Discord", link: 'https://discord.gg/WaAKnSw6Ha', owner: 'Hanzo' },
	{ name: "Kurbdogg420's Discord", link: 'https://discord.gg/EUkY43zSWd', owner: 'Kurbdogg420' },
	{ name: "Make's Discord", link: 'https://discord.gg/47pyuCNuxG', owner: 'Make' },
	{
		name: "Merlon Warlock's Discord",
		link: 'https://discord.gg/dpXEKGSVxw',
		owner: 'Merlon Warlock'
	},
	{ name: "Speekeek's Discord", link: 'https://discord.gg/XHfcp258rv', owner: 'Speekeek' },
	{ name: "Stevyy's Discord", link: 'https://discord.gg/9EzS82SNqG', owner: 'Stevyy' },
	{ name: "Sungodpxllz's Discord", link: 'https://discord.gg/cUnwY8ZZej', owner: 'Sungodpxllz' }
];

export const categories = [
	{
		title: 'Modder Discords',
		data: modderDiscords,
		description:
			'Connect with the creative minds behind your favorite mods. These Discord communities are hubs for developers and users to share tips, mods, and tutorials.'
	},
	{
		title: 'Map Discords',
		data: mapDiscords,
		description:
			'Discover new maps and connect with map creators. These Discords offer exclusive previews, downloads, and insider advice on navigating new skate parks and environments.'
	},
	{
		title: 'Gear Discords',
		data: gearDiscords,
		description:
			'Find the latest custom gear and designs. These Discord channels are dedicated to customizing your gameplay experience with new gear, outfits, and accessories.'
	}
];
