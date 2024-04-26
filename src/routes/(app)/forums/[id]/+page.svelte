<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { tocCrawler } from '@skeletonlabs/skeleton';

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

	interface Comment {
		id: number;
		comment_text: string;
		profiles: Profile;
		created_at: string;
		profile_id: string;
	}

	export let data: {
		session: any;
		supabase: any;
		thread: Thread;
		comments: Comment[];
	};

	let { session, supabase, thread, comments } = data;
	let newComment = '';
	let error: string | null = null;
	let loading = false;
	let commentsContainer: HTMLElement | null = null;

	const fetchCommentsAndSubmit = async () => {
		try {
			const { data: commentsData, error: fetchError } = await supabase
				.from('comments')
				.select('id, comment_text, profile_id, profiles(username), created_at')
				.eq('thread_id', thread.id);

			if (fetchError) throw new Error(fetchError.message);

			comments = commentsData.map((comment: Comment) => ({
				...comment,
				profile: comment.profiles ? { username: comment.profiles.username } : null
			}));

			error = null;
		} catch (error: any) {
			console.error('Error:', error.message);
			error = error.message || 'An error occurred.';
		}
	};

	const submitComment = async () => {
		if (!session) {
			error = 'Please log in to post comments.';
			return;
		}

		if (!newComment.trim()) {
			error = 'Comment cannot be empty.';
			return;
		}

		try {
			loading = true;
			const { error: insertError } = await supabase.from('comments').insert([
				{
					thread_id: thread.id,
					profile_id: session.user.id,
					comment_text: newComment
				}
			]);

			if (insertError) throw new Error(insertError.message);

			await fetchCommentsAndSubmit();
			newComment = '';
		} catch (error: any) {
			console.error('Error:', error.message);
			error = error.message || 'An error occurred.';
		} finally {
			loading = false;
		}
	};

	const editComment = async (comment: Comment) => {
		// Implement your logic to handle editing here
		try {
			const newCommentText = prompt('Enter new comment text:', comment.comment_text);
			if (newCommentText === null) {
				// User canceled editing
				return;
			}
			const { error } = await supabase
				.from('comments')
				.update({
					comment_text: newCommentText
				})
				.eq('id', comment.id);
			if (error) {
				console.error('Error editing comment:', error.message);
				throw new Error('Failed to edit comment');
			}
			// Update the comment in the list
			const updatedComments = comments.map((c) => {
				if (c.id === comment.id) {
					return { ...c, comment_text: newCommentText };
				}
				return c;
			});
			comments = updatedComments;
			console.log('Comment edited successfully:');
		} catch (error) {
			console.error('Failed to edit comment:', error instanceof Error ? error.message : error);
		}
	};

	// Function to handle deleting a comment
	const deleteComment = async (comment: Comment) => {
		try {
			// Attempt to delete the comment from the database
			const { error: deleteCommentError } = await supabase
				.from('comments')
				.delete()
				.eq('id', comment.id);
			if (deleteCommentError) {
				console.error('Error deleting comment from database:', deleteCommentError.message);
				throw new Error('Failed to delete comment from database');
			}

			// Update the local state to reflect the deletion
			comments = comments.filter((t) => t.id !== comment.id);
			console.log('Comment deleted successfully');
		} catch (error) {
			console.error('Failed to delete comment:', error instanceof Error ? error.message : error);
		}
	};

	onMount(fetchCommentsAndSubmit);

	afterUpdate(() => {
		if (commentsContainer) {
			commentsContainer.scrollTop = commentsContainer.scrollHeight;
		}
	});

	const formatDate = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		});
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			submitComment();
		}
	};

	// Function to confirm thread deletion
	const confirmDelete = async (comment: Comment) => {
		if (window.confirm('Are you sure you want to delete this comment?')) {
			await deleteComment(comment);
		}
	};
</script>

<svelte:head>
	<title>Skatebit | Forums | {thread.title}</title>
</svelte:head>

<div use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
	<article
		class="container mx-auto max-w-4xl inset-x-0 top-[4.6rem] bottom-0 flex h-screen flex-col"
	>
		<div class="header mb-2">
			<span class="badge variant-filled-primary mb-2">Thread</span>
			<h1>{thread.title}</h1>
			<p>{thread.description}</p>
			<div>
				<p class="text-sm mt-2">
					Uploaded by: <span class="font-medium">{thread.profiles?.username}</span>
				</p>
				{#if thread.created_at}
					<p class="text-sm">
						Created: <span class="font-medium">{formatDate(thread.created_at)}</span>
					</p>
				{/if}
			</div>
			<hr class="!border-t-2 mb-4" />
		</div>

		<div class="flex-grow overflow-y-auto" bind:this={commentsContainer}>
			<ul>
				{#each comments as comment}
					<li class="py-2">
						<div class="flex items-center mb-1">
							<div>
								<span class="text-primary-500 font-bold mr-2">{comment.profiles.username}</span>
								<span class="text-gray-500 text-sm">{formatDate(comment.created_at)}</span>
							</div>
							{#if session && session.user && session.user.id === comment.profile_id}
								<div class="ml-4 grid grid-cols-2 gap-2">
									<button
										class="btn btn-sm variant-filled-surface"
										on:click={() => editComment(comment)}
									>
										Edit
									</button>
									<button
										class="btn btn-sm variant-filled-surface"
										on:click={() => confirmDelete(comment)}
									>
										Delete
									</button>
								</div>
							{/if}
						</div>
						<!-- Changed class to prevent word breaking incorrectly -->
						<div class="text-base overflow-wrap: break-word;">{comment.comment_text}</div>
					</li>
				{/each}
			</ul>
		</div>

		{#if session}
			<div class="flex sticky bottom-0 mb-12 py-4">
				<input
					type="text"
					bind:value={newComment}
					placeholder="Add a comment..."
					class="input mr-2 flex-grow"
					on:keydown={handleKeyDown}
				/>
				<button
					on:click={submitComment}
					class="btn variant-filled-secondary"
					disabled={!newComment.trim() || loading}>Post</button
				>
			</div>
		{:else}
			<div class="flex justify-center">
				<a
					href="/login"
					class="button btn variant-filled-primary"
					data-sveltekit-preload-data="hover">Login to Chat</a
				>
			</div>
		{/if}

		{#if error}
			<p class="text-red-500 p-4">{error}</p>
		{/if}
	</article>
</div>
