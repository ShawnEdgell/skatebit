<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Ad = {
		href: string;
		imgSrc: string;
		altText: string;
		title: string;
		description: string;
	};

	const ads: Ad[] = [
		{
			href: 'https://mod.io/g/skaterxl/m/xlgearmodifier',
			imgSrc: '/images/XLGM.webp',
			altText: 'XL Gear Modifier',
			title: 'XL Gear Modifier',
			description: 'Now available on Skater XL v1.2.7.8 (Public)'
		},
		{
			href: '/skaterxl/xlhub',
			imgSrc: '/images/XLHub.webp',
			altText: 'XL Hub by Fro',
			title: 'XL Hub by Fro',
			description: 'The new way to mod Skater XL.'
		},
		{
			href: 'https://mod.io/g/skaterxl/m/xlweather',
			imgSrc: '/images/XLWeather.webp',
			altText: 'Weather Mod by Guru',
			title: 'Weather Mod by Guru',
			description: 'Explore the new Weather Mod for Skater XL.'
		}
		// Add more ads as needed
	];

	let currentAdIndex = 0;

	// Function to switch ad
	function switchAd() {
		currentAdIndex = (currentAdIndex + 1) % ads.length;
	}

	let intervalId: ReturnType<typeof setInterval>;

	// Start switching ads every 30 seconds
	onMount(() => {
		intervalId = setInterval(switchAd, 30000); // Adjusted to switch ad every 30 seconds
	});

	// Clean up on destroy
	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<a
	class="block card card-hover p-0"
	href={ads[currentAdIndex].href}
	target={ads[currentAdIndex].href.startsWith('http') ? '_blank' : '_self'}
	rel={ads[currentAdIndex].href.startsWith('http') ? 'noopener noreferrer' : ''}
>
	<div class="aspect-ratio-16/9 rounded-lg overflow-hidden">
		<img src={ads[currentAdIndex].imgSrc} alt={ads[currentAdIndex].altText} />
	</div>
	<p class="p-4">
		<strong>{ads[currentAdIndex].title}</strong>
		<br />
		<span class="text-sm">{ads[currentAdIndex].description}</span>
	</p>
</a>
