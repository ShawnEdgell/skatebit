<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import CountdownTimerSmall from '../ui/CountdownTimerSmall.svelte';
	import { getEndOfCurrentWeek } from '$lib/utils/week';

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	let colorClass = 'text-success'; // default to green
	let interval: ReturnType<typeof setInterval>;

	function updateCountdown() {
		const now = new Date();
		const endOfWeek = getEndOfCurrentWeek();
		const diff = endOfWeek.getTime() - now.getTime();

		if (diff <= 0) {
			clearInterval(interval);
			days = hours = minutes = seconds = 0;
			colorClass = 'text-error'; // time's up
			return;
		}

		days = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((diff / (1000 * 60)) % 60);
		seconds = Math.floor((diff / 1000) % 60);

		// Set urgency-based color
		if (days === 0 && hours === 0) {
			colorClass = 'text-error';
		} else if (days === 0) {
			colorClass = 'text-warning';
		} else {
			colorClass = 'text-success';
		}
	}

	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<span class={`countdown font-mono ${colorClass}`} aria-label="Countdown to end of week">
	<span style={`--value:${days}`} aria-label={`${days} days`}>{days}</span>:
	<span style={`--value:${hours}`} aria-label={`${hours} hours`}>{hours}</span>:
	<span style={`--value:${minutes}`} aria-label={`${minutes} minutes`}>{minutes}</span>:
	<span style={`--value:${seconds}`} aria-label={`${seconds} seconds`}>{seconds}</span>
</span>
