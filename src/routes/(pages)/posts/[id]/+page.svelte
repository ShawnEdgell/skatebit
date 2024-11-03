<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { user } from '$lib/stores/authStore';
	import { db, storage } from '$lib/firebase';
	import {
		collection,
		doc,
		getDoc,
		updateDoc,
		deleteDoc,
		addDoc,
		onSnapshot,
		orderBy,
		query
	} from 'firebase/firestore';
	import { ref as storageRef, deleteObject } from 'firebase/storage';
	import type { Post } from '$lib';

	// Define a Comment type
	type Comment = {
		id: string;
		content: string;
		createdAt: {
			seconds: number;
			nanoseconds: number;
		};
		userId: string;
		userName: string;
	};

	let postId = $page.params.id;
	let post: Post | null = null;
	let isLoading = true;
	let errorMessage = '';
	let isUpdating = false;
	let isDeleting = false;

	// Variables for edit mode
	let isEditing = false;
	let editTitle = '';
	let editDescription = '';

	// Comments related variables
	let comments: Comment[] = []; // Explicitly defining comments as an array of Comment objects
	let newComment: string = ''; // Explicitly defining newComment as a string
	let commentError: string = '';

	onMount(async () => {
		await fetchPost();
		fetchComments();
	});

	const fetchPost = async () => {
		isLoading = true;
		errorMessage = '';
		try {
			const docRef = doc(db, 'posts', postId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				post = { id: docSnap.id, ...docSnap.data() } as Post;

				// If user is logged in and matches the post owner, update the display name if needed
				if ($user && $user.uid === post.userId) {
					const userDocRef = doc(collection(db, 'users'), $user.uid);
					const userDoc = await getDoc(userDocRef);
					if (userDoc.exists()) {
						const userData = userDoc.data();
						post.userName = userData.username || $user.displayName || $user.email || 'Anonymous';
					}
				}
			} else {
				errorMessage = 'Post not found.';
			}
		} catch (error) {
			console.error('Error fetching post:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to load post: ${error.message}`;
			} else {
				errorMessage = 'Failed to load post due to an unknown error.';
			}
		} finally {
			isLoading = false;
		}
	};

	const startEdit = () => {
		if (post) {
			isEditing = true;
			editTitle = post.title;
			editDescription = post.description;
		}
	};

	const cancelEdit = () => {
		isEditing = false;
		editTitle = '';
		editDescription = '';
		errorMessage = '';
	};

	const updatePost = async () => {
		if (!editTitle || !editDescription) {
			errorMessage = 'Please fill in all fields.';
			return;
		}
		isUpdating = true;
		errorMessage = '';

		try {
			if (!$user) {
				errorMessage = 'User not authenticated.';
				isUpdating = false;
				return;
			}

			await updateDoc(doc(db, 'posts', postId), {
				title: editTitle,
				description: editDescription
			});

			// Update the local post object
			if (post) {
				post.title = editTitle;
				post.description = editDescription;
			}

			isEditing = false;
		} catch (error) {
			console.error('Error updating post:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to update post: ${error.message}`;
			} else {
				errorMessage = 'Failed to update post due to an unknown error.';
			}
		} finally {
			isUpdating = false;
		}
	};

	const deletePost = async () => {
		if (!confirm('Are you sure you want to delete this post?')) {
			return;
		}
		isDeleting = true;
		errorMessage = '';

		try {
			if (!$user) {
				errorMessage = 'User not authenticated.';
				isDeleting = false;
				return;
			}

			// Delete the file from Firebase Storage
			if (post) {
				const fileRef = storageRef(storage, post.filePath);
				await deleteObject(fileRef);

				// Delete the post from Firestore
				await deleteDoc(doc(db, 'posts', postId));

				// Redirect to the upload page
				window.location.href = '/stats';
			}
		} catch (error) {
			console.error('Error deleting post:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to delete post: ${error.message}`;
			} else {
				errorMessage = 'Failed to delete post due to an unknown error.';
			}
		} finally {
			isDeleting = false;
		}
	};

	// Fetch comments for the post
	const fetchComments = () => {
		const commentsRef = collection(db, `posts/${postId}/comments`);
		const q = query(commentsRef, orderBy('createdAt', 'asc'));

		// Listen for real-time updates to comments
		onSnapshot(q, (querySnapshot) => {
			comments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Comment[];
		});
	};

	// Add a new comment
	const addComment = async () => {
		if (!newComment.trim()) return;
		if (!$user) {
			commentError = 'User not authenticated.';
			return;
		}

		try {
			const commentsRef = collection(db, `posts/${postId}/comments`);
			await addDoc(commentsRef, {
				content: newComment,
				createdAt: new Date(),
				userId: $user.uid,
				userName: $user.displayName || 'Anonymous'
			});
			newComment = '';
		} catch (error) {
			console.error('Error adding comment:', error);
		}
	};

	// Delete a comment
	const deleteComment = async (commentId: string) => {
		// Explicitly defining commentId as a string
		if (!confirm('Are you sure you want to delete this comment?')) return;

		try {
			await deleteDoc(doc(db, `posts/${postId}/comments/${commentId}`));
		} catch (error) {
			console.error('Error deleting comment:', error);
		}
	};
</script>

<svelte:head>
	<title>Skatebit | {post ? post.title : 'Post'}</title>
</svelte:head>

<div class="mb-8">
	<a href="/stats">Back to Uploads</a>
</div>
{#if isLoading}
	<p>Loading post...</p>
{:else if errorMessage}
	<p class="text-error">{errorMessage}</p>
{:else if post}
	{#if isEditing}
		<!-- Edit Form -->
		<form class="space-y-4" on:submit|preventDefault={updatePost}>
			<div>
				<input
					class="input input-bordered w-full"
					type="text"
					placeholder="Input"
					bind:value={editTitle}
					required
				/>
			</div>

			<div>
				<textarea
					class="textarea textarea-bordered w-full"
					rows="4"
					bind:value={editDescription}
					required
				></textarea>
			</div>
			<div class="flex justify-center space-x-2">
				<button class="btn" type="button" on:click={cancelEdit}>Cancel</button>
				<button class="btn btn-primary" type="submit" disabled={isUpdating}>
					{#if isUpdating}
						Updating...
					{:else}
						Update
					{/if}
				</button>
			</div>
		</form>
	{:else}
		<!-- Display Post -->
		<h1>{post.title}</h1>
		<p class="flex items-center gap-2">
			{#if post.userPhotoURL}
				<img src={post.userPhotoURL} class="w-6 h-6 m-0 rounded-full" alt="Profile" />
			{/if}
			<span>
				Posted by {post.userName} on {new Date(post.createdAt.seconds * 1000).toLocaleString()}
			</span>
		</p>
		<p>{post.description}</p>
		<!-- Download Button -->
		<a href={post.fileURL} class="btn btn-primary not-prose" download>Download</a>
		<!-- Show edit/delete buttons if current user is the original poster -->
		{#if $user && $user.uid === post.userId}
			<button on:click={startEdit} class="btn btn-warning">Edit</button>
			<button on:click={deletePost} class="btn btn-error" disabled={isDeleting}>
				{#if isDeleting}
					Deleting...
				{:else}
					Delete
				{/if}
			</button>
		{/if}
	{/if}
{/if}

<hr />

<!-- Comments Section -->
<h2>Comments</h2>
<div>
	{#if comments.length === 0}
		<p>No comments yet.</p>
	{/if}

	{#each comments as comment}
		<div class={comment.userId === $user?.uid ? 'chat chat-end' : 'chat chat-start'}>
			<div class="chat-header flex items-center gap-2 mb-1">
				{#if post?.userPhotoURL}
					<img src={post?.userPhotoURL} class="w-6 h-6 m-0 rounded-full" alt="Profile" />
				{/if}
				{comment.userName}
				<time class="text-xs opacity-50"
					>{new Date(comment.createdAt.seconds * 1000).toLocaleString()}</time
				>
			</div>
			<div class="chat-bubble">{comment.content}</div>
		</div>
		<div class="flex w-full justify-end">
			{#if $user && $user.uid === comment.userId}
				<button on:click={() => deleteComment(comment.id)} class="btn btn-xs btn-error"
					>Delete</button
				>{/if}
		</div>
	{/each}

	<div class="flex gap-2">
		<input
			type="text"
			placeholder="Type your comment"
			class="input w-full input-bordered mt-2"
			bind:value={newComment}
		/>
		<button on:click={addComment} class="btn btn-primary mt-2">Send</button>
	</div>
</div>
