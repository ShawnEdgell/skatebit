<script lang="ts">
	import { page } from '$app/stores';
	import {
		doc,
		getDoc,
		collection,
		getDocs,
		addDoc,
		updateDoc,
		deleteDoc,
		serverTimestamp
	} from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import type { Timestamp } from 'firebase/firestore';
	import type { ForumPost, ForumComment } from '$lib/types/forum';

	// Helper function to format a Date or Firebase Timestamp.
	function formatTimestamp(ts: Date | Timestamp | null): string {
		if (!ts) return '';
		if ('toDate' in ts) {
			return ts.toDate().toLocaleString();
		}
		return (ts as Date).toLocaleString();
	}

	// Read the dynamic parameter from the page store.
	const threadId = $page.params.id;
	console.log('Thread ID from $page:', threadId);

	let post: ForumPost | null = null;
	let comments: ForumComment[] = [];
	let newComment: string = '';
	let loading: boolean = true;

	async function loadThread(): Promise<void> {
		try {
			if (!threadId) {
				console.error('No thread ID available.');
				return;
			}
			const postRef = doc(db, 'posts', threadId);
			const postSnap = await getDoc(postRef);
			if (postSnap.exists()) {
				post = { id: postSnap.id, ...postSnap.data() } as ForumPost;
				console.log('Loaded post:', post);
			} else {
				console.error('No post found for id:', threadId);
				post = null;
			}
			const commentsSnapshot = await getDocs(collection(postRef, 'comments'));
			comments = commentsSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})) as ForumComment[];
			console.log('Loaded comments:', comments);
		} catch (error) {
			console.error('Error loading thread:', error);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		loadThread();
	});

	async function createComment(): Promise<void> {
		if (!newComment.trim()) return;
		try {
			const postRef = doc(db, 'posts', threadId);
			const commentData = {
				text: newComment,
				authorId: $user?.uid || '',
				authorName: $user?.displayName || 'Anonymous',
				createdAt: new Date(),
				updatedAt: new Date()
			};
			await addDoc(collection(postRef, 'comments'), commentData);
			newComment = '';
			await loadThread();
		} catch (error) {
			console.error('Error creating comment:', error);
		}
	}

	async function updateComment(commentId: string, newText: string): Promise<void> {
		try {
			const postRef = doc(db, 'posts', threadId);
			const commentRef = doc(postRef, 'comments', commentId);
			await updateDoc(commentRef, {
				text: newText,
				updatedAt: new Date()
			});
			await loadThread();
		} catch (error) {
			console.error('Error updating comment:', error);
		}
	}

	async function deleteComment(commentId: string): Promise<void> {
		if (confirm('Are you sure you want to delete this comment?')) {
			try {
				const postRef = doc(db, 'posts', threadId);
				const commentRef = doc(postRef, 'comments', commentId);
				await deleteDoc(commentRef);
				await loadThread();
			} catch (error) {
				console.error('Error deleting comment:', error);
			}
		}
	}

	async function deleteThread(): Promise<void> {
		if (post?.authorId !== $user?.uid) return;
		if (confirm('Are you sure you want to delete this thread?')) {
			try {
				await deleteDoc(doc(db, 'posts', threadId));
				window.location.href = '/forum';
			} catch (error) {
				console.error('Error deleting thread:', error);
			}
		}
	}

	// New function: edit the thread.
	async function updateThread(): Promise<void> {
		if (!post) return;
		// Prompt for new title and content.
		const newTitle = prompt('Enter new thread title:', post.title);
		if (newTitle === null) return; // Cancelled.
		const newContent = prompt('Enter new thread content:', post.content);
		if (newContent === null) return; // Cancelled.
		try {
			const postRef = doc(db, 'posts', threadId);
			await updateDoc(postRef, {
				title: newTitle,
				content: newContent,
				updatedAt: serverTimestamp()
			});
			await loadThread();
		} catch (error) {
			console.error('Error updating thread:', error);
		}
	}
</script>

<svelte:head>
	<title>Skatebit | {post ? post.title : 'Forum Thread'}</title>
	<meta name="description" content={post ? post.content.substring(0, 150) : 'Forum thread'} />
</svelte:head>

{#if loading}
	<p>Loading thread...</p>
{:else if post}
	<h1>{post.title}</h1>
	<p>{post.content}</p>
	<p class="text-sm opacity-50">
		Posted by {post.authorName} on {formatTimestamp(post.createdAt)}
	</p>
	{#if post.authorId === $user?.uid}
		<!-- Show Edit and Delete buttons for the thread -->
		<button class="btn btn-sm" on:click={updateThread}>Edit</button>
		<button class="btn btn-sm" on:click={deleteThread}>Delete</button>
	{/if}
{:else}
	<p>Thread not found.</p>
{/if}

<div class="divider mb-6"></div>

{#if $user}
	<section>
		<form on:submit|preventDefault={createComment}>
			<textarea
				bind:value={newComment}
				placeholder="Add a comment..."
				class="textarea textarea-bordered w-full"
			></textarea>

			<button type="submit" class="btn btn-primary mt-2">Post Comment</button>
		</form>
	</section>
{:else}
	<section>
		<p>Log in to join the discussion!</p>
	</section>
{/if}
<h2>Comments</h2>
{#each comments as comment}
	<p class="text-sm opacity-50">
		{comment.authorName} on {formatTimestamp(comment.createdAt)}
	</p>
	<p>{comment.text}</p>

	{#if comment.authorId === $user?.uid}
		<button
			class="btn btn-sm"
			on:click={() => {
				const newText = prompt('New text:', comment.text);
				if (newText !== null) updateComment(comment.id, newText);
			}}>Edit</button
		>
		<button class="btn btn-sm" on:click={() => deleteComment(comment.id)}>Delete</button>
	{/if}
	<div class="divider"></div>
{/each}
