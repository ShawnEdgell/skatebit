<!-- page.svelte -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	interface Profile {
		username: string;
	}

	interface Stat {
		id: number;
		title: string;
		description: string;
		file_url: string;
		created_at: string;
		updated_at: string;
		profiles?: Profile; // Make sure this matches the structure returned by your query
	}

	// Define the component's props
	export let data: {
		session: any;
		supabase: any;
		stats: Stat[];
	};

	// Define component variables and functions
	let { session, supabase, stats } = data;
	let form: HTMLFormElement;
	let loading = false;
	let title: string = '';
	let description: string = '';
	let isFormValid: boolean = false;
	let fileInput: HTMLInputElement;

	// Function to handle form submission
	const handleSubmit = () => {
		loading = true;
		return async () => {
			title = '';
			description = '';
			if (fileInput) fileInput.value = '';
			await reloadStats();
			loading = false;
		};
	};

	// Function to reload stats data
	const reloadStats = async () => {
		const { data: newData, error } = await supabase
			.from('xl_stats')
			.select(
				'id, title, description, created_at, updated_at, file_url, profiles:profile_id(username)'
			);

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

	// Run code on component mount
	onMount(async () => {
		await reloadStats();
		// Initialize the file input variable after the component mounts
		fileInput = document.getElementById('file') as HTMLInputElement;
	});

	// Correctly declare reactive statements
	$: if (fileInput) {
		fileInput.addEventListener('change', () => {
			isFormValid =
				!!title.trim().length && !!description.trim().length && !!fileInput?.files?.length;
		});
	}

	// Reactively update isFormValid
	$: isFormValid =
		!!title.trim().length && !!description.trim().length && !!fileInput?.files?.length;
</script>

<svelte:head>
	<title>Skatebit | Stats</title>
</svelte:head>

<div class="flex flex-col items-center space-y-5">
	{#if session}
		<form
			class="flex flex-col items-center space-y-5"
			method="post"
			action="?/addStat"
			use:enhance={handleSubmit}
			bind:this={form}
			enctype="multipart/form-data"
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
			<input class="input" id="file" name="file" type="file" accept=".zip" />
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

	<h2>List of Stats</h2>
	<ul class="space-y-6 w-full">
		{#each stats as stat}
			<li>
				<div class="flex card p-4 justify-between items-center space-y-2 gap-8">
					<div class="flex flex-col space-y-1">
						<strong>Title: {stat.title}</strong>
						<p>Uploaded by: {stat.profiles?.username}</p>
						<p>Description: {stat.description}</p>
						{#if stat.created_at}
							<p>Created: {formatDate(stat.created_at)}</p>
						{/if}
					</div>
					{#if stat.file_url}
						<!-- Temporarily display the URL -->
						<a
							href={stat.file_url}
							class="btn btn-sm variant-filled-secondary"
							download="{stat.title}.zip"
						>
							Download
						</a>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>
