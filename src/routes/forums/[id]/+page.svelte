<script lang="ts">
	import { onMount } from 'svelte';

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

	interface Session {
		user: {
			id: string;
			username: string;
		};
	}

	export let data: {
		thread: Thread;
		comments: Comment[];
		session: Session | null;
	};

	let newComment = '';

	async function submitComment() {
		if (!data.session) {
			return; // Do nothing if not logged in
		}

		if (!newComment.trim()) {
			return; // Do nothing if the comment is empty
		}

		const response = await fetch('/api/comments', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				thread_id: data.thread.id,
				profile_id: data.session.user.id,
				comment_text: newComment
			})
		});

		if (response.ok) {
			const addedComment = await response.json();
			data.comments.push(addedComment);
			newComment = ''; // Clear the text field
		} else {
			console.error('Failed to post comment');
		}
	}

	async function fetchComments() {
		const response = await fetch(`/api/comments?thread_id=${data.thread.id}`);
		if (response.ok) {
			data.comments = await response.json();
		} else {
			console.error('Failed to fetch comments');
		}
	}

	onMount(fetchComments);
</script>

<svelte:head>
	<title>Thread Detail</title>
</svelte:head>

<article>
	<h1>{data.thread.title}</h1>
	<p>{data.thread.description}</p>
	<ul>
		{#each data.comments as comment}
			<li>{comment.comment_text} - {comment.profile.username}</li>
		{/each}
	</ul>
	{#if data.session}
		<textarea bind:value={newComment} placeholder="Add a comment..." class="textarea"></textarea>
		<button
			on:click={submitComment}
			class="btn btn-sm variant-filled-secondary"
			disabled={!newComment.trim()}>Post Comment</button
		>
	{:else}
		<p>Please log in to post comments.</p>
	{/if}
</article>
