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
		file_url: string[]; // Updated to indicate an array of strings
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

	const handleFileChange = () => {
		if (fileInput && fileInput.files && fileInput.files.length > 8) {
			// If more than 8 files are selected, alert the user and reset the input
			alert('You can only select up to 8 images.');
			fileInput.value = ''; // Clear the selected files
		}
		// Update the form validity based on the number of selected files
		isFormValid =
			!!title.trim().length && !!description.trim().length && !!fileInput?.files?.length;
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

	const deleteStat = async (stat: Stat) => {
		// Assuming stat.file_url contains URLs of files within the directory we want to delete
		if (stat.file_url.length > 0) {
			// Extract the paths for deletion
			const filePaths = stat.file_url.map((url) => {
				// Create a URL object from the URL string
				const parsedUrl = new URL(url);
				// Assuming your URL might look something like "https://your-bucket.region.supabase.co/storage/v1/object/public/session_stat_files/userId/timestamp/filename.jpg"
				// You need to extract the path segment after "/object/public/"
				const pathSegments = parsedUrl.pathname.split('/');
				// This assumes your storage paths start immediately after 'public/'
				const startIndex = pathSegments.indexOf('public') + 2; // +2 to skip 'public' and the first part of the path (e.g., 'session_stat_files')
				const filePath = pathSegments.slice(startIndex).join('/');
				return filePath;
			});

			// Delete files in batch
			const { error } = await supabase.storage.from('session_stat_files').remove(filePaths);
			if (error) {
				console.error('Failed to delete files:', error.message);
				// Handle failure
				return;
			}

			// Once all files are deleted, proceed to delete the stat record
			const { error: deleteStatError } = await supabase
				.from('session_stats')
				.delete()
				.match({ id: stat.id });
			if (deleteStatError) {
				console.error('Failed to delete stat record:', deleteStatError.message);
				// Handle deletion error
			} else {
				// Update UI or state as necessary to reflect the deletion
				stats = stats.filter((s) => s.id !== stat.id);
			}
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
				<aside class="alert variant-ghost-error mb-6">
					<!-- Icon -->
					<div>
						<svg class="w-12 h-12" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<!-- Message -->
					<div class="alert-message">
						<h3 class="h3">Upload Info</h3>
						<p>
							Please note that you can currently only upload up to 8 images at a time. This will
							likely change in the future. For now, we recommend splitting your Stats and Camera
							settings into two different uploads. We also recommend images to be 1280x720, but any
							size will work as long as the images are less than 2MB each. You can always edit or
							delete your stat uploads.
						</p>
					</div>
				</aside>

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
							on:change={handleFileChange}
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
												src={stat.file_url[0]}
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
											{#each stat.file_url as url}
												<img
													src={url}
													alt={stat.title}
													class="rounded-lg shadow-md w-full h-auto object-cover object-center"
													loading="lazy"
												/>
											{/each}
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
