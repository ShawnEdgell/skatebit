<!-- page.svelte -->

<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { tocCrawler } from '@skeletonlabs/skeleton';

	interface Profile {
		username: string;
	}

	let mods = [
		{ name: 'XXL Mod Stats', path: 'Documents/SkaterXL/XXLMod3/StatsCollections' },
		{ name: 'XXL Mod Stance', path: 'Documents/SkaterXL/XXLMod3/StanceCollections' },
		{ name: 'XXL Mod Steeze', path: 'Documents/SkaterXL/XXLMod3/SteezeCollections' },
		{ name: 'Fro Mod Settings', path: 'Steam/steamapps/common/SkaterXL/Mods/fro-mod' },
		{ name: 'Boned Ollie Mod Settings', path: 'Documents/SkaterXL/BonedOllieMod' }
	];

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
			.from('xl_stats')
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
				.from('xl_stats')
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
		const filePath = stat.file_url.split('/').pop(); // Gets the filename from the URL

		try {
			// Attempt to delete the file from storage
			const { error: deleteFileError } = await supabase.storage
				.from('xl_stat_files') // Ensure this is your correct bucket name
				.remove([filePath]);

			if (deleteFileError) {
				console.error('Error deleting file from storage:', deleteFileError.message);
				throw new Error('Failed to delete file from storage');
			}

			// Proceed to delete the stat from the database
			const { error: deleteStatError } = await supabase.from('xl_stats').delete().eq('id', stat.id);
			if (deleteStatError) {
				console.error('Error deleting stat from database:', deleteStatError.message);
				throw new Error('Failed to delete stat from database');
			}

			// Update the local state to reflect the deletion
			stats = stats.filter((s) => s.id !== stat.id);
			console.log('Stat and associated file deleted successfully');
		} catch (error) {
			console.error(
				'Failed to delete stat or file:',
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
	<title>Skatebit | Skater XL</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
		<div class="header">
			<span class="badge variant-filled-tertiary mb-2">Skater XL</span>
			<h1>Stats & Settings</h1>
			<p>Download and share Skater XL Stats and Settings.</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			<h2 class="h2">Installing Stats</h2>
			<p>
				After downloading stats, you will need to place them in the following directories to
				install:
			</p>
			<ul class="space-y-2">
				{#each mods as mod}
					<li>
						{mod.name}:
						<code class="code">{mod.path}</code>
					</li>
				{/each}
			</ul>
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
								Please make sure to organize your stats in a .zip file and include a description for
								each file so users will understand their purpose. You can also include a text file
								if you think it might provide helpful additional information. Remember, you can
								always edit or delete your stat uploads.
							</p>
						</div>
					</aside>

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
						<input class="input" id="file" name="file" type="file" accept=".zip" />
						<small class="text-gray-500">File must be less than 2MB and in .zip format.</small>
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
			<h2>Downloads</h2>
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
									<a
										href={stat.file_url}
										class="btn variant-filled-secondary"
										download="{stat.title}.zip">Download</a
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
