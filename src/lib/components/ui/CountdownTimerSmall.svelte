<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getEndOfCurrentWeek } from '$lib/utils/week';

	export let size: string = 'text-2xl'; // optional prop for styling

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	let interval: ReturnType<typeof setInterval>;

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

	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<span class={`countdown font-mono ${size}`} aria-label="Countdown to end of week">
	<span style={`--value:${days}`} aria-label={`${days} days`}>{days}</span>:
	<span style={`--value:${hours}`} aria-label={`${hours} hours`}>{hours}</span>:
	<span style={`--value:${minutes}`} aria-label={`${minutes} minutes`}>{minutes}</span>:
	<span style={`--value:${seconds}`} aria-label={`${seconds} seconds`}>{seconds}</span>
</span>
