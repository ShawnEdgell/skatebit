<!-- src/lib/components/content/general/Comments.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import {
		doc,
		collection,
		addDoc,
		deleteDoc,
		onSnapshot,
		orderBy,
		query
	} from 'firebase/firestore';
	import { user } from '$lib/stores/authStore';
	import type { Comment } from '$lib/types/comments/Comment';

	// Props to identify the parent document (post or video)
	export let parentId: string;
	export let parentType: 'posts' | 'videos'; // To differentiate between posts and videos

	let comments: Comment[] = [];
	let newComment: string = '';
	let commentError: string = '';
	let isLoadingComments = true;
	let commentsErrorMessage = '';

	// Fetch comments from Firestore in real-time
	const fetchComments = () => {
		const commentsRef = collection(db, `${parentType}/${parentId}/comments`);
		const q = query(commentsRef, orderBy('createdAt', 'asc'));

		onSnapshot(
			q,
			(querySnapshot) => {
				comments = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				})) as Comment[];
				isLoadingComments = false;
			},
			(error) => {
				console.error('Error fetching comments:', error);
				commentsErrorMessage = 'Failed to load comments.';
				isLoadingComments = false;
			}
		);
	};

	// Initialize comments on component mount
	onMount(() => {
		fetchComments();
	});

	// Add a new comment
	const addComment = async () => {
		if (!newComment.trim()) return;
		if (!$user) {
			commentError = 'User not authenticated.';
			return;
		}

		try {
			const commentsRef = collection(db, `${parentType}/${parentId}/comments`);
			await addDoc(commentsRef, {
				content: newComment,
				createdAt: new Date(),
				userId: $user.uid,
				userName: $user.displayName || 'Anonymous'
			});
			newComment = '';
			commentError = '';
		} catch (error) {
			console.error('Error adding comment:', error);
			commentError = 'Failed to add comment.';
		}
	};

	// Delete a comment
	const deleteComment = async (commentId: string) => {
		if (!confirm('Are you sure you want to delete this comment?')) return;

		try {
			await deleteDoc(doc(db, `${parentType}/${parentId}/comments/${commentId}`));
		} catch (error) {
			console.error('Error deleting comment:', error);
			commentError = 'Failed to delete comment.';
		}
	};
</script>

<h2>Comments</h2>
<div>
	{#if isLoadingComments}
		<p>Loading comments...</p>
	{:else if commentsErrorMessage}
		<p class="text-red-500">{commentsErrorMessage}</p>
	{:else if comments.length === 0}
		<p>No comments yet.</p>
	{:else}
		{#each comments as comment}
			<div class={comment.userId === $user?.uid ? 'chat chat-end' : 'chat chat-start'}>
				<div class="chat-header flex items-center gap-2 mb-1 prose">
					{comment.userName}
					<time class="opacity-50">
						{new Date(comment.createdAt.seconds * 1000).toLocaleString()}
					</time>
				</div>
				<div class="chat-bubble">{comment.content}</div>
			</div>
			<div class="flex w-full justify-end">
				{#if $user && $user.uid === comment.userId}
					<button on:click={() => deleteComment(comment.id)} class="btn btn-xs btn-error">
						Delete
					</button>
				{/if}
			</div>
		{/each}
	{/if}

	{#if $user}
		<div class="flex gap-2 mt-4">
			<input
				type="text"
				placeholder="Type your comment"
				class="input w-full input-bordered"
				bind:value={newComment}
				on:keydown={(e) => e.key === 'Enter' && addComment()}
			/>
			<button on:click={addComment} class="btn btn-primary" disabled={!newComment.trim()}>
				Send
			</button>
		</div>
		{#if commentError}
			<p class="text-red-500 mt-2">{commentError}</p>
		{/if}
	{:else}
		<p class="mt-4">Please sign in to add comments.</p>
	{/if}
</div>

<style>
	/* Ensure that the chat classes are defined as per your CSS framework (e.g., Tailwind CSS) */
</style>
