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
		serverTimestamp,
		query,
		orderBy
	} from 'firebase/firestore';
	import { db } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import type { Timestamp } from 'firebase/firestore';
	import type { ForumPost, ForumComment } from '$lib/types/forum';
	import GoogleLoginButton from '$lib/components/GoogleLoginButton.svelte';

	// Helper function to format a Date or Firebase Timestamp.
	function formatTimestamp(ts: Date | Timestamp | null): string {
		if (!ts) return '';
		let date: Date;
		if ('toDate' in ts) {
			date = ts.toDate();
		} else {
			date = ts as Date;
		}
		// Format the date as "Mar 1, 2025"
		const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
		return date.toLocaleDateString('en-US', options);
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
			// Query comments ordered by createdAt descending (newest first)
			const commentsQuery = query(collection(postRef, 'comments'), orderBy('createdAt', 'desc'));
			const commentsSnapshot = await getDocs(commentsQuery);
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
				authorAvatar: $user?.photoURL || 'https://via.placeholder.com/40',
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
		const newTitle = prompt('Enter new thread title:', post.title);
		if (newTitle === null) return;
		const newContent = prompt('Enter new thread content:', post.content);
		if (newContent === null) return;
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

<a href="/forum" class="btn btn-sm btn-soft mb-6 no-underline">Back to Forum</a>

{#if loading}
	<p>Loading thread...</p>
{:else if post}
	<h1>{post.title}</h1>
	<p>{post.content}</p>
	<div class="flex items-center gap-2">
		<img
			src={post.authorAvatar || 'https://via.placeholder.com/40'}
			alt={post.authorName}
			class="not-prose h-8 w-8 rounded-full"
		/>
		<span class="text-sm opacity-50"
			>Posted by {post.authorName} on {formatTimestamp(post.createdAt)}</span
		>
	</div>
	{#if post.authorId === $user?.uid}
		<!-- Show Edit and Delete buttons for the thread -->
		<button class="btn btn-sm mt-6" on:click={updateThread}>Edit</button>
		<button class="btn btn-sm mt-6" on:click={deleteThread}>Delete</button>
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
			<div class="mt-2">
				<button type="submit" class="btn btn-primary">Post Comment</button>
			</div>
		</form>
	</section>
{:else}
	<section>
		<p>Log in to join the discussion!</p>
		<GoogleLoginButton />
	</section>
{/if}

<div class="mb-12">
	<h2>Comments</h2>
</div>
{#if comments.length > 0}
	{#each comments as comment}
		<div>
			<!-- Header: Avatar and timestamp in-line -->
			<div class="not-prose flex items-center gap-2">
				<img
					src={comment.authorAvatar || 'https://via.placeholder.com/40'}
					alt={comment.authorName}
					class="mr-1 h-8 w-8 rounded-full"
				/>
				<p>
					<span class=" mr-1 text-base">{comment.authorName}</span>
					<span class="text-sm opacity-50">{formatTimestamp(comment.createdAt)}</span>
				</p>
			</div>
			<!-- Comment text below the header -->
			<div>
				<p>{comment.text}</p>
				{#if comment.authorId === $user?.uid}
					<button
						class="btn btn-sm"
						on:click={() => {
							const newText = prompt('New text:', comment.text);
							if (newText !== null) updateComment(comment.id, newText);
						}}
					>
						Edit
					</button>
					<button class="btn btn-sm" on:click={() => deleteComment(comment.id)}> Delete </button>
				{/if}
			</div>
			<div class="divider"></div>
		</div>
	{/each}
{:else}
	<p class="text-sm opacity-50">No comments yet. Be the first to comment!</p>
{/if}
