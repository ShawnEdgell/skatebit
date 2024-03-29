<!-- page.svelte -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { Accordion, AccordionItem, tocCrawler } from '@skeletonlabs/skeleton';

	interface Profile {
		username: string;
	}

	interface Stat {
		id: number;
		title: string;
		description: string;
		file_url: string;
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

	// Function to confirm stat deletion
	const confirmDelete = async (stat: Stat) => {
		if (window.confirm('Are you sure you want to delete this stat?')) {
			await deleteStat(stat);
		}
	};

	// Function to reload stats data
	const reloadStats = async () => {
		const { data: newData, error } = await supabase
			.from('session_stats')
			.select('id, title, description, file_url, created_at, profile_id, profiles(username)');

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
				.from('session_stats')
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

	// Function to handle deleting a stat and its file
	const deleteStat = async (stat: Stat) => {
		// Extract the path from file_url, assuming it includes the full storage path
		const fileStoragePath = stat.file_url.split('session_stat_files/')[1]; // Adjust based on how your URLs are structured

		try {
			// Delete the file from storage
			const { error: deleteFileError } = await supabase.storage
				.from('session_stat_files')
				.remove([fileStoragePath]); // Use the full path including profile_id folder

			if (deleteFileError) {
				console.error('Error deleting file from storage:', deleteFileError.message);
				throw new Error('Failed to delete file from storage');
			}

			// Delete the stat from the database
			const { error: deleteStatError } = await supabase
				.from('session_stats')
				.delete()
				.eq('id', stat.id);

			if (deleteStatError) {
				console.error('Error deleting stat:', deleteStatError.message);
				throw new Error('Failed to delete stat');
			} else {
				stats = stats.filter((s) => s.id !== stat.id);
			}
		} catch (error) {
			console.error(
				'Failed to delete file or stat:',
				error instanceof Error ? error.message : error
			);
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
	<title>Skatebit | Session: Skate Sim</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-error mb-2">Session</span>
			<h1>Stats & Settings</h1>
			<p>Find and share the best setting for Session: Skate Sim.</p>
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
					<h2>Upload Your Stats</h2>

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
					<div class="w-full">
						<input
							class="input"
							id="file"
							name="file"
							type="file"
							multiple
							accept="image/jpeg, image/png, image/webp"
						/>
						<small class="text-gray-500"
							>File must be less than 2MB and in JPEG, PNG, or WEBP format.</small
						>
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
				<!-- Link to login page if user is not logged in -->
				<a href="/login" class="button btn variant-filled" data-sveltekit-preload-data="hover">
					Login to Add Stats
				</a>
			{/if}
		</div>

		<div>
			<h2>Community Stats</h2>
		</div>
		<div>
			<ul class="space-y-6 w-full">
				{#each stats as stat}
					<li>
						<div class="flex flex-col card p-6 space-y-5">
							<div class="flex flex-col sm:flex-row justify-between items-center gap-6">
								<div class="flex flex-col space-y-4 w-full">
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
									<!-- Ensure session exists and the logged-in user matches the stat's profile_id before showing Edit/Delete -->
									{#if session && session.user && session.user.id === stat.profile_id}
										<button class="btn variant-filled-warning" on:click={() => editStat(stat)}
											>Edit</button
										>
										<button class="btn variant-filled-error" on:click={() => confirmDelete(stat)}
											>Delete</button
										>
									{/if}

									{#if stat.file_url}
										<div class="max-w-lg mx-auto">
											<img
												src={stat.file_url}
												alt={stat.title}
												class="rounded-lg shadow-md w-full h-auto object-cover object-center"
												loading="lazy"
											/>
										</div>
									{/if}
								</div>
							</div>
							<div>
								<Accordion>
									<AccordionItem>
										<svelte:fragment slot="summary">View full stats</svelte:fragment>
										<svelte:fragment slot="content">
											<img
												src={stat.file_url}
												alt={stat.title}
												class="rounded-lg shadow-md w-full h-auto object-cover object-center"
												loading="lazy"
											/>
										</svelte:fragment>
									</AccordionItem>
									<!-- ... -->
								</Accordion>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</article>
</div>
