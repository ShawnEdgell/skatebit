<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { tocCrawler } from '@skeletonlabs/skeleton';

	interface Profile {
		username: string;
	}

	interface Stat {
		id: number;
		title: string;
		description: string;
		created_at: string;
		profile_id: string;
		profiles?: Profile;
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

	const handleSubmit = async () => {
		loading = true;
		try {
			const { error } = await supabase.from('forum_threads').insert({ title, description });
			if (error) {
				console.error('Error adding stat:', error.message);
			} else {
				title = '';
				description = '';
				await reloadStats();
			}
		} finally {
			loading = false;
		}
	};

	// Function to confirm stat deletion
	const confirmDelete = async (stat: Stat) => {
		if (window.confirm('Are you sure you want to delete this stat?')) {
			await deleteStat(stat);
		}
	};

	// Function to reload stats data
	const reloadStats = async () => {
		const { data: newData, error } = await supabase
			.from('forum_threads')
			.select('id, title, description, created_at, profile_id, profiles(username)');

		if (error) {
			console.error('Error fetching data:', error.message);
		} else {
			stats = newData ?? [];
		}
	};

	const editStat = async (stat: Stat) => {
		// Implement your logic to handle editing here
		try {
			const newTitle = prompt('Enter new title:', stat.title);
			const newDescription = prompt('Enter new description:', stat.description);
			if (newTitle === null || newDescription === null) {
				// User canceled editing
				return;
			}
			const { error } = await supabase
				.from('forum_threads')
				.update({
					title: newTitle,
					description: newDescription
				})
				.eq('id', stat.id);
			if (error) {
				console.error('Error editing stat:', error.message);
				throw new Error('Failed to edit stat');
			}
			// Update the stat in the list
			const updatedStats = stats.map((s) => {
				if (s.id === stat.id) {
					return { ...s, title: newTitle, description: newDescription };
				}
				return s;
			});
			stats = updatedStats;
			console.log('Stat edited successfully:');
		} catch (error) {
			console.error('Failed to edit stat:', error instanceof Error ? error.message : error);
		}
	};

	// Function to handle deleting an XL stat
	const deleteStat = async (stat: Stat) => {
		try {
			// Attempt to delete the stat from the database
			const { error: deleteStatError } = await supabase
				.from('forum_threads')
				.delete()
				.eq('id', stat.id);
			if (deleteStatError) {
				console.error('Error deleting stat from database:', deleteStatError.message);
				throw new Error('Failed to delete stat from database');
			}

			// Update the local state to reflect the deletion
			stats = stats.filter((s) => s.id !== stat.id);
			console.log('Stat deleted successfully');
		} catch (error) {
			console.error('Failed to delete stat:', error instanceof Error ? error.message : error);
		}
	};

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		// Convert the date to the user's local time zone
		const formatted = new Intl.DateTimeFormat('default', {
			dateStyle: 'medium',
			timeStyle: 'short',
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
		}).format(date);
		return formatted;
	}

	// Run code on component mount
	onMount(async () => {
		await reloadStats();
	});

	// Correctly declare reactive statements
	$: isFormValid = !!title.trim().length && !!description.trim().length;
</script>

<svelte:head>
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
			<h1>Forums</h1>
			<p>Welcome to the Forums!</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			{#if session}
				<form
					class="flex flex-col space-y-5"
					method="post"
					action="?/addStat"
					use:enhance={handleSubmit}
					bind:this={form}
					enctype="multipart/form-data"
				>
					<h2>Create a New Thread</h2>

					<div class="w-full">
						<input
							class="input"
							id="title"
							name="title"
							type="text"
							placeholder="Stat Title"
							bind:value={title}
						/>
					</div>
					<div class="w-full">
						<input
							class="input"
							id="description"
							name="description"
							type="text"
							placeholder="Stat Description"
							bind:value={description}
						/>
					</div>
					<div class="w-full flex justify-center">
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
		</div>

		<div>
			<h2>Threads</h2>
		</div>
		<div>
			<ul class="space-y-6 w-full">
				{#each stats as stat}
					<li>
						<div class="flex flex-col sm:flex-row card p-6 justify-between items-center gap-6">
							<div class="flex flex-col space-y-4">
								<h3 class="h3">{stat.title}</h3>
								<p>{stat.description}</p>
								<div>
									<hr class="!border-t-2 mb-4" />
									<p class="text-sm mt-2">
										Uploaded by: <span class="font-medium">{stat.profiles?.username}</span>
									</p>
									{#if stat.created_at}
										<p class="text-sm">
											Created: <span class="font-medium">{formatDate(stat.created_at)}</span>
										</p>
									{/if}
								</div>
							</div>

							<div class="flex flex-col gap-2">
								{#if session && session.user && session.user.id === stat.profile_id}
									<button class="btn variant-filled-warning" on:click={() => editStat(stat)}
										>Edit</button
									>
									<button class="btn variant-filled-error" on:click={() => confirmDelete(stat)}
										>Delete</button
									>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</article>
</div>
