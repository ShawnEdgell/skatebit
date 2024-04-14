<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { tocCrawler } from '@skeletonlabs/skeleton';

	interface Profile {
		username: string;
	}

	interface Thread {
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
		threads: Thread[];
	};

	// Define component variables and functions
	let { session, supabase, threads } = data;
	let form: HTMLFormElement;
	let loading = false;
	let title: string = '';
	let description: string = '';
	let isFormValid: boolean = false;

	const handleSubmit = async () => {
		loading = true;
		try {
			const { data: newThread, error } = await supabase
				.from('forum_threads')
				.insert({ title, description });
			if (error) {
				console.error('Error adding thread:', error.message);
			} else {
				title = '';
				description = '';
				// Directly add the newly created thread to the beginning of the threads array
				threads = [newThread, ...threads];
			}
		} finally {
			loading = false;
		}
	};

	// Function to confirm thread deletion
	const confirmDelete = async (thread: Thread) => {
		if (window.confirm('Are you sure you want to delete this thread?')) {
			await deleteThread(thread);
		}
	};

	// Function to reload threads data
	const reloadThreads = async () => {
		const { data: newData, error } = await supabase
			.from('forum_threads')
			.select('id, title, description, created_at, profile_id, profiles(username)');

		if (error) {
			console.error('Error fetching data:', error.message);
		} else {
			threads = newData ?? [];
		}
	};

	const editThread = async (thread: Thread) => {
		// Implement your logic to handle editing here
		try {
			const newTitle = prompt('Enter new title:', thread.title);
			const newDescription = prompt('Enter new description:', thread.description);
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
				.eq('id', thread.id);
			if (error) {
				console.error('Error editing thread:', error.message);
				throw new Error('Failed to edit thread');
			}
			// Update the thread in the list
			const updatedThreads = threads.map((t) => {
				if (t.id === thread.id) {
					return { ...t, title: newTitle, description: newDescription };
				}
				return t;
			});
			threads = updatedThreads;
			console.log('Thread edited successfully:');
		} catch (error) {
			console.error('Failed to edit thread:', error instanceof Error ? error.message : error);
		}
	};

	// Function to handle deleting a thread
	const deleteThread = async (thread: Thread) => {
		try {
			// Attempt to delete the thread from the database
			const { error: deleteThreadError } = await supabase
				.from('forum_threads')
				.delete()
				.eq('id', thread.id);
			if (deleteThreadError) {
				console.error('Error deleting thread from database:', deleteThreadError.message);
				throw new Error('Failed to delete thread from database');
			}

			// Update the local state to reflect the deletion
			threads = threads.filter((t) => t.id !== thread.id);
			console.log('Thread deleted successfully');
		} catch (error) {
			console.error('Failed to delete thread:', error instanceof Error ? error.message : error);
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
		await reloadThreads();
	});

	// Correctly declare reactive statements
	$: isFormValid = !!title.trim().length && !!description.trim().length;
</script>

<svelte:head>
	<title>Skatebit | Forums</title>
</svelte:head>

<div class="flex justify-center" use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article class="max-w-4xl w-full p-4">
		<div class="header">
			<span class="badge variant-filled-primary mb-2">Hub</span>
			<h1>Forums</h1>
			<p>Welcome to the Forums!</p>
			<hr class="!border-t-2" />
		</div>
		<div>
			{#if session}
				<form
					class="flex flex-col space-y-5"
					method="post"
					action="?/addThread"
					use:enhance={handleSubmit}
					bind:this={form}
					enctype="multipart/form-data"
				>
					<h2>Create a New Thread</h2>

					<div class="w-full">
						<input
							class="input"
							id="thread-title"
							name="title"
							type="text"
							placeholder="Thread Title"
							bind:value={title}
						/>
					</div>
					<div class="w-full">
						<textarea
							class="textarea"
							id="thread-content"
							name="description"
							placeholder="Thread Content"
							bind:value={description}
						></textarea>
					</div>
					<div class="w-full flex justify-center">
						<input
							type="submit"
							class="button block btn variant-filled-secondary"
							value={loading ? 'Creating...' : 'Post Thread'}
							disabled={!isFormValid || loading}
						/>
					</div>
				</form>
			{:else}
				<a href="/login" class="button btn variant-filled" data-sveltekit-preload-data="hover">
					Login to Chat
				</a>
			{/if}
		</div>

		<!-- Reload button for refreshing thread list -->
		<div class="mt-4 flex justify-center">
			<button class="button btn variant-filled-primary" on:click={reloadThreads}>
				Reload Threads
			</button>
		</div>

		<div>
			<h2>Threads</h2>
		</div>
		<div>
			<ul class="space-y-6 w-full">
				{#each threads as thread}
					<li>
						<div class="flex card p-6 justify-between items-center gap-6">
							<div class="flex w-full flex-col space-y-4">
								<h3 class="h3">{thread.title}</h3>
								<p>{thread.description}</p>
								<div>
									<hr class="!border-t-2 mb-4" />
									<p class="text-sm mt-2">
										Uploaded by: <span class="font-medium">{thread.profiles?.username}</span>
									</p>
									{#if thread.created_at}
										<p class="text-sm">
											Created: <span class="font-medium">{formatDate(thread.created_at)}</span>
										</p>
									{/if}
								</div>
							</div>

							<div class="flex flex-col gap-2">
								{#if session && session.user && session.user.id === thread.profile_id}
									<button
										class="btn btn-sm sm:btn-md variant-filled-warning"
										on:click={() => editThread(thread)}>Edit</button
									>
									<button
										class="btn btn-sm sm:btn-md variant-filled-error"
										on:click={() => confirmDelete(thread)}>Delete</button
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
