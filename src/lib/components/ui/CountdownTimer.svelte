<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { getEndOfCurrentWeek } from '$lib/utils/week';

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let colorClass = 'text-success'; // default

	const dispatch = createEventDispatcher();
	let interval: ReturnType<typeof setInterval>;

	function updateCountdown() {
		const now = new Date();
		const endOfWeek = getEndOfCurrentWeek();
		const diff = endOfWeek.getTime() - now.getTime();

		if (diff <= 0) {
			clearInterval(interval);
			days = hours = minutes = seconds = 0;
			colorClass = 'text-error';
			dispatch('countdownEnded');
			return;
		}

		days = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((diff / (1000 * 60)) % 60);
		seconds = Math.floor((diff / 1000) % 60);

		// Update the color class based on urgency
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

<div
	class="card bg-neutral rounded-box mx-auto mt-10 grid w-fit auto-cols-max grid-flow-col gap-4 p-4 text-center"
>
	{#each [{ label: 'days', value: days }, { label: 'hours', value: hours }, { label: 'min', value: minutes }, { label: 'sec', value: seconds }] as unit}
		<div class={`rounded-box ${colorClass} flex flex-col p-2 px-4`}>
			<span class="countdown font-mono text-4xl">
				<span style={`--value:${unit.value}`} aria-label={unit.value}>{unit.value}</span>
			</span>
			<span class="text-xs">{unit.label}</span>
		</div>
	{/each}
</div>
