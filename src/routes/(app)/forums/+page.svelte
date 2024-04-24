<script lang="ts">
	import { onMount } from 'svelte';
	import { tocCrawler } from '@skeletonlabs/skeleton';

	// Define the Thread and Profile interfaces
	interface Thread {
		id: number;
		title: string;
		description: string;
		created_at: string;
		profile_id: string;
		profiles?: Profile;
	}

	interface Profile {
		username: string;
	}

	// Define the component's props
	export let data: {
		session: any;
		supabase: any;
		threads: Thread[];
	};

	// Define component variables and functions
	let { session, supabase, threads } = data;
	let loading = false;
	let title: string = '';
	let description: string = '';
	let isFormValid: boolean = false;
	let form: HTMLFormElement;

	// Define handleSubmit function to submit only one form
	const handleSubmit = async () => {
		loading = true;
		try {
			const { data: newThread, error } = await supabase
				.from('forum_threads')
				.insert({ title, description, profile_id: session.user.id }); // Add profile_id

			if (error) {
				console.error('Error adding thread:', error.message);
			} else {
				title = '';
				description = '';
				await reloadThreads(); // Wait for thread reload to complete
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

	// Function to handle deleting a thread and its associated comments
	const deleteThread = async (thread: Thread) => {
		try {
			// First, delete all comments associated with the thread
			const { error: deleteCommentsError } = await supabase
				.from('comments') // Ensure the table name is correct as per your schema
				.delete()
				.match({ thread_id: thread.id }); // Ensure 'thread_id' is the correct foreign key column

			if (deleteCommentsError) {
				console.error(
					'Error deleting comments associated with the thread:',
					deleteCommentsError.message
				);
				throw new Error('Failed to delete comments associated with the thread');
			}

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
			console.log('Thread and associated comments deleted successfully');
		} catch (error) {
			console.error(
				'Failed to delete thread and its comments:',
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
		await reloadThreads();
	});

	// Correctly declare reactive statements
	$: isFormValid = !!title.trim().length && !!description.trim().length;

	// Function to navigate to thread details
	function goToThread(id: number) {
		import('$app/navigation').then(({ goto }) => {
			goto(`/forums/${id}`);
		});
	}
</script>

<svelte:head>
	<title>Skatebit | Forums</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article>
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
					on:submit|preventDefault={handleSubmit}
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
				<div class="flex justify-center">
					<a href="/login" class="button btn variant-filled" data-sveltekit-preload-data="hover"
						>Login to Chat</a
					>
				</div>
			{/if}
		</div>
		<div>
			<h2>Threads</h2>
		</div>
		<div>
			<ul class="space-y-6 w-full">
				{#each threads as thread}
					<li>
						<div class="flex flex-col sm:flex-row card p-6 justify-between items-center gap-6">
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
							<div class="flex flex-row sm:flex-col gap-2">
								{#if session && session.user && session.user.id === thread.profile_id}
									<button
										class="btn variant-filled-warning w-full sm:w-auto"
										on:click={() => editThread(thread)}>Edit</button
									>
									<button
										class="btn variant-filled-error w-full sm:w-auto"
										on:click={() => confirmDelete(thread)}>Delete</button
									>
								{/if}
								<button
									class="btn variant-filled-primary w-full sm:w-auto"
									on:click={() => goToThread(thread.id)}>View Thread</button
								>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</article>
</div>
