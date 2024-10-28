export interface StatSection {
	title: string;
	description: string;
	downloadLink: string;
	discordLink?: string;
}

export const statSections: StatSection[] = [
	{
		title: 'Basic Realistic Stats (Goofy & Regular)',
		description: `These stats are designed to be as easy to use as possible. They include automatic steeze (flips)
with the XXL 3 Mod. Boned Ollie Mod settings aren't included in this pack.`,
		downloadLink:
			'https://firebasestorage.googleapis.com/v0/b/skatebit-65c51.appspot.com/o/Basic_Realistic_Settings.zip?alt=media&token=0331e15d-225c-4dd5-84f7-d87df00a24b0'
	},
	{
		title: "Milky's Latest Stats (Regular)",
		description: `14 Gravity. These are the latest stats I've been using. You can find more stats from myself and other community members in my Discord!`,
		downloadLink:
			'https://firebasestorage.googleapis.com/v0/b/skatebit-65c51.appspot.com/o/Milky_October-2024_STATS.zip?alt=media&token=4587263d-3c04-49ee-b6b2-fd176cf2ceaf',
		discordLink: 'https://discord.gg/G9aW5uV'
	}
];
