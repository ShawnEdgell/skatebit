// src/lib/types/pageHeader.ts

export interface PageHeaderSection {
	title: string;
	description: string;
	heading: string;
}

export interface PageHeader {
	news: PageHeaderSection;
	guides: PageHeaderSection;
	links: PageHeaderSection;
	mods: PageHeaderSection;
	stats: PageHeaderSection;
	profile: PageHeaderSection;
	post: PageHeaderSection;
}
