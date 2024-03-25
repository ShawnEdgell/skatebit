<!-- stats.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: {
		session: any; // TODO: Define actual types if possible
		supabase: any; // TODO: Define actual types if possible
		stats: {
			id: number;
			title: string;
			description: string;
			created_at?: string;
			updated_at?: string;
		}[];
	};

	let { session, supabase, stats } = data;
	let form: HTMLFormElement;
	let loading = false;
	let title: string = '';
	let description: string = '';
	let isFormValid = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
			title = '';
			description = '';
			await reloadStats();
		};
	};

	const reloadStats = async () => {
		const { data: newData, error } = await supabase
			.from('xl_stats')
			.select('id, title, description, created_at, updated_at');
		if (error) {
			console.error('Error fetching data:', error.message);
		} else {
			stats = newData ?? [];
		}
	};

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('default', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(date);
	}

	$: isFormValid = title.trim().length > 0 && description.trim().length > 0;

	onMount(async () => {
		await reloadStats();
	});
</script>

<svelte:head>
	<title>Skatebit | Stats</title>
</svelte:head>

<div class="flex flex-col items-center space-y-5">
	{#if session}
		<!-- Check if user is logged in -->
		<form
			class="flex flex-col items-center space-y-5"
			method="post"
			action="?/addStat"
			use:enhance={handleSubmit}
			bind:this={form}
		>
			<div>
				<input
					class="input"
					id="title"
					name="title"
					type="text"
					placeholder="Stat Title"
					bind:value={title}
				/>
			</div>
			<div>
				<input
					class="input"
					id="description"
					name="description"
					type="text"
					placeholder="Stat Description"
					bind:value={description}
				/>
			</div>
			<div>
				<input
					type="submit"
					class="button block btn variant-filled-secondary"
					value={loading ? 'Adding...' : 'Add Stats'}
					disabled={!isFormValid || loading}
				/>
			</div>
		</form>
	{:else}
		<a href="/login" class="button btn variant-filled" data-sveltekit-preload-data="hover">
			Login to Add Stats
		</a>
	{/if}

	<button class="button btn variant-filled" on:click={reloadStats}>Reload List</button>
	<div>
		<h2>List of Stats</h2>
		<ul>
			{#each stats as stat}
				<li>
					{stat.title}
					{stat.description}
					{#if stat.created_at && stat.updated_at}
						- Created: {formatDate(stat.created_at)}, Updated: {formatDate(stat.updated_at)}
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>
