<script lang="ts">
	import { onMount } from 'svelte';

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

	interface Comment {
		id: number;
		comment_text: string;
		profile: Profile;
	}

	// Define the component's props
	export let data: {
		session: any;
		supabase: any;
		thread: Thread;
		comments: Comment[];
	};

	// Define component variables and functions
	let { session, supabase, thread, comments } = data;
	let newComment = '';
	let error: string | null = null;
	let loading = false;

	interface Comment {
		id: number;
		comment_text: string;
		profiles: Profile; // Change from 'profile' to 'profiles'
	}

	// Modify the fetchComments function to populate the profile data
	const fetchComments = async () => {
		try {
			const { data: commentsData, error: fetchError } = await supabase
				.from('comments')
				.select('id, comment_text, profile_id, profiles(username)')
				.eq('thread_id', thread.id);

			if (fetchError) {
				console.error('Error fetching comments:', fetchError.message);
				throw new Error('Failed to fetch comments');
			}

			// Map comments data to include profile information
			comments = commentsData.map((comment: Comment) => {
				return {
					...comment,
					profile: comment.profiles ? { username: comment.profiles.username } : null
				};
			});

			error = null;
		} catch (error: any) {
			console.error('Failed to fetch comments:', error.message);
			error = 'Failed to fetch comments. Please try again later.';
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

			if (insertError) {
				console.error('Error adding comment:', insertError.message);
				throw new Error('Failed to add comment');
			}

			await fetchComments();
			newComment = '';
			error = null;
		} catch (error: any) {
			console.error('Failed to add comment:', error.message);
			error = 'Failed to add comment. Please try again later.';
		} finally {
			loading = false;
		}
	};

	// Run code on component mount
	onMount(fetchComments);
</script>

<svelte:head>
	<title>Thread Detail</title>
</svelte:head>

<article
	class="container absolute mx-auto max-w-4xl inset-x-0 top-[4.5rem] bottom-0 flex h-screen flex-col p-4"
>
	<!-- Forum Topic (Stuck to Top) -->
	<div class="header mb-2">
		<span class="badge variant-filled-primary mb-2">Thread</span>
		<h1>{thread.title}</h1>
		<p>{thread.description}</p>
		<hr class="!border-t-2" />
	</div>

	<!-- Comments Section (Scrollable, in the Middle) -->
	<div class="flex-grow overflow-y-auto mb-12">
		<ul>
			{#each comments as comment}
				<li class="py-2">{comment.comment_text} - {comment.profile.username}</li>
			{/each}
		</ul>
	</div>

	<!-- Comment Input and Post Button (Stuck to Bottom) -->
	{#if session}
		<div class="input-container mb-0 flex sticky bottom-0 py-4">
			<input
				type="text"
				bind:value={newComment}
				placeholder="Add a comment..."
				class="input mr-2 flex-grow"
			/>
			<button
				on:click={submitComment}
				class="btn variant-filled-secondary"
				disabled={!newComment.trim() || loading}>Post</button
			>
		</div>
	{:else}
		<p class="py-4">Please log in to post comments.</p>
	{/if}

	<!-- Error Message -->
	{#if error}
		<p class="text-red-500 p-4">{error}</p>
	{/if}
</article>
