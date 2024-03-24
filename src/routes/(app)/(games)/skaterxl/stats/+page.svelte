<script lang="ts">
	import { enhance } from '$app/forms';
	import { writable } from 'svelte/store';
	import type { Session } from '@supabase/supabase-js';
	import type { StatsData } from './types';

	export let data: { session: Session; supabase: any };

	let statsForm: HTMLFormElement;
	let loading = false;

	// Initialize statsData as a writable store
	let statsData = writable<StatsData[]>([]);

	const handleSubmit = () => {
		loading = true;
		return async () => {
			loading = false;
			await fetch('/api/+page/upload', {
				method: 'POST',
				body: new FormData(statsForm)
			});
			// Refresh stats data after submission
			await fetchStatsData();
		};
	};

	const fetchStatsData = async () => {
		try {
			// Fetch stats data from the server-side load function
			const { stats } = data;
			statsData.set(stats);
		} catch (error) {
			console.error('Error fetching stats data:', error);
		}
	};

	// Fetch and update statsData on component mount
	fetchStatsData();
</script>

<svelte:head>
	<title>Skater XL Stats</title>
</svelte:head>

{#if data.session}
	<form
		class="flex flex-col items-center space-y-5"
		method="post"
		action="?/upload"
		use:enhance={handleSubmit}
		bind:this={statsForm}
		enctype="multipart/form-data"
	>
		<div>
			<input class="input" id="title" type="text" placeholder="Title" name="title" />
		</div>
		<div>
			<textarea class="input" id="description" placeholder="Description" name="description"
			></textarea>
		</div>
		<div>
			<input class="input" id="file" type="file" accept=".webp" name="file" />
		</div>
		<div>
			<input
				type="submit"
				class="button block btn variant-filled-secondary"
				value={loading ? 'Uploading...' : 'Upload Stats'}
				disabled={loading}
			/>
		</div>
	</form>
{:else}
	<div class="row flex-center flex-col items-center flex">
		<div class="col-6 form-widget">
			<a href="/login" class="button block btn variant-filled-secondary">Login</a>
		</div>
		<p>You must be logged in to upload stats & settings.</p>
	</div>
{/if}

<h2>Submitted Stats Data</h2>
{#each $statsData as stat}
	<div>
		<p>Title: {stat.title}</p>
		<p>Description: {stat.description}</p>
		<!-- Include other properties as needed -->
	</div>
{/each}
