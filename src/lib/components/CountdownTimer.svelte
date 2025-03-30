<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { getEndOfCurrentWeek } from '$lib/utils/week';

	export let label = '⏳';

	let countdown = '';
	let interval: ReturnType<typeof setInterval>;
	const dispatch = createEventDispatcher();

	function updateCountdown() {
		const now = new Date();
		const endOfWeek = getEndOfCurrentWeek();
		const diff = endOfWeek.getTime() - now.getTime();

		if (diff <= 0) {
			clearInterval(interval);
			countdown = 'Submissions closed';
			dispatch('countdownEnded');
			return;
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((diff / (1000 * 60)) % 60);
		const seconds = Math.floor((diff / 1000) % 60);

		countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}

	onMount(() => {
		updateCountdown();
		interval = setInterval(updateCountdown, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<p class="text-warning font-semibold">{label} {countdown}</p>
