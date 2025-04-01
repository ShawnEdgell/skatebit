<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getEndOfCurrentWeek } from '$lib/utils/week';

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let interval: number | undefined;

	// Ensure we have a fallback for the class function
	function getColorClass() {
		if (days === 0 && hours === 0) return 'text-error';
		if (days === 0) return 'text-warning';
		return 'text-success';
	}

	// Ensure the update function works with a valid time diff
	function updateCountdown() {
		const now = new Date();
		const endOfWeek = getEndOfCurrentWeek();
		const diff = endOfWeek.getTime() - now.getTime();

		if (diff <= 0) {
			clearInterval(interval);
			days = hours = minutes = seconds = 0;
			return;
		}

		days = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((diff / (1000 * 60)) % 60);
		seconds = Math.floor((diff / 1000) % 60);
	}

	// Set up the interval and make sure it's cleared
	onMount(() => {
		updateCountdown();
		interval = window.setInterval(updateCountdown, 1000);
	});

	// Clean up interval on destroy
	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<span class={`countdown font-mono ${getColorClass()}`} aria-label="Countdown to end of week">
	<span style={`--value:${days}`} aria-label={`${days} days`}></span>:
	<span style={`--value:${hours}`} aria-label={`${hours} hours`}></span>:
	<span style={`--value:${minutes}`} aria-label={`${minutes} minutes`}></span>:
	<span style={`--value:${seconds}`} aria-label={`${seconds} seconds`}></span>
</span>
