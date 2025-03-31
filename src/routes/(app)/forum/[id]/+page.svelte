<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import GoogleLoginButton from '$lib/components/auth/GoogleLoginButton.svelte';
	import { formatDate } from '$lib/utils/formatDate';
	import type { ForumPost, ForumComment } from '$lib/types/forum';
	import {
		getForumThread,
		getForumComments,
		addForumComment,
		editForumComment,
		deleteForumComment,
		deleteForumThread,
		updateForumThread,
		likeForumPost,
		likeForumComment
	} from '$lib/firebase/forum';

	let post: ForumPost | null = null;
	let comments: ForumComment[] = [];
	let newComment = '';
	let loading = true;

	const threadId = $page.params.id;

	async function loadThread() {
		loading = true;
		post = await getForumThread(threadId);
		comments = await getForumComments(threadId);
		loading = false;
	}

	async function createComment() {
		if (!newComment.trim()) return;

		const addedComment = await addForumComment(threadId, {
			text: newComment,
			authorId: $user?.uid ?? '',
			authorName: $user?.displayName ?? 'Anonymous',
			authorAvatar: $user?.photoURL ?? '',
			postId: threadId
		});

		newComment = '';
		comments = [addedComment, ...comments];
	}

	async function updateComment(commentId: string, newText: string) {
		await editForumComment(threadId, commentId, newText);
		comments = comments.map((comment) =>
			comment.id === commentId ? { ...comment, text: newText, updatedAt: new Date() } : comment
		);
	}

	async function removeComment(commentId: string) {
		if (confirm('Are you sure you want to delete this comment?')) {
			await deleteForumComment(threadId, commentId);
			comments = comments.filter((comment) => comment.id !== commentId);
		}
	}

	async function toggleLikePost() {
		if (!post || !$user?.uid) return;

		await likeForumPost(post.id!, $user.uid);

		// Optimistically update the UI
		const alreadyLiked = post.likedBy?.includes($user.uid);
		const newLikes = alreadyLiked ? (post.likes ?? 1) - 1 : (post.likes ?? 0) + 1;
		const updatedLikedBy = alreadyLiked
			? post.likedBy?.filter((uid) => uid !== $user.uid)
			: [...(post.likedBy ?? []), $user.uid];

		post = {
			...post,
			likes: newLikes,
			likedBy: updatedLikedBy
		};
	}

	async function toggleLikeComment(commentId: string) {
		if (!$user) return;
		await likeForumComment(threadId, commentId, $user.uid);
		comments = await getForumComments(threadId); // Refresh comments
	}

	async function removeThread() {
		if (post?.authorId !== $user?.uid) return;
		if (confirm('Are you sure you want to delete this thread?')) {
			await deleteForumThread(threadId);
			window.location.href = '/forum';
		}
	}

	async function editThread() {
		if (!post) return;
		const newTitle = prompt('New thread title:', post.title);
		if (newTitle === null) return;
		const newContent = prompt('New content:', post.content);
		if (newContent === null) return;
		await updateForumThread(threadId, newTitle, newContent);
		await loadThread();
	}

	onMount(loadThread);
</script>

<svelte:head>
	<title>Skatebit | {post ? post.title : 'Forum Thread'}</title>
	<meta name="description" content={post ? post.content.substring(0, 150) : 'Forum thread'} />
</svelte:head>

<a href="/forum" class="btn btn-soft mb-6 no-underline">Back to Forum</a>

{#if loading}
	<p>Loading thread...</p>
{:else if post}
	<h1>{post.title}</h1>
	<p>{post.content}</p>

	<div class="not-prose my-6 flex items-center gap-2">
		<img
			src={post.authorAvatar || 'https://via.placeholder.com/40'}
			alt={post.authorName}
			class="h-8 w-8 rounded-full"
		/>
		<span class="text-sm opacity-50">
			Posted by {post.authorName} on {formatDate(post.createdAt)}
		</span>

		<!-- ✅ Public like count -->
		{#if (post.likes ?? 0) > 0}
			<span class="text-sm text-green-500">+{post.likes}</span>
		{/if}
	</div>

	<!-- 🧡 Like button (only for logged-in users) -->
	{#if $user}
		<button class="btn btn-sm" on:click={toggleLikePost}>
			{post.likedBy?.includes($user.uid) ? '❤️ Liked' : '🤍 Like'}
		</button>
	{/if}

	{#if post.authorId === $user?.uid}
		<button class="btn btn-sm" on:click={editThread}>Edit</button>
		<button class="btn btn-sm" on:click={removeThread}>Delete</button>
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
	<p>Log in to join the discussion!</p>
	<GoogleLoginButton />
{/if}

<div class="mt-6 mb-12">
	<h2>Comments</h2>
</div>

{#if comments.length > 0}
	{#each comments as comment}
		<div>
			<div class="not-prose flex items-center gap-2">
				<img
					src={comment.authorAvatar || 'https://via.placeholder.com/40'}
					alt={comment.authorName}
					class="h-8 w-8 rounded-full"
				/>
				<p>
					<span class="mr-1">{comment.authorName}</span>
					<span class="mr-1 text-sm opacity-50">{formatDate(comment.createdAt)}</span>
					<!-- 🧡 Always show like count if > 0 -->
					{#if (comment.likes ?? 0) > 0}
						<span class="text-success text-sm">+{comment.likes}</span>
					{/if}
				</p>
			</div>
			<div>
				<p>{comment.text}</p>

				<!-- 🧡 Like button for logged-in users -->
				{#if $user}
					<button
						class="btn btn-sm mt-1"
						on:click={() => comment.id && toggleLikeComment(comment.id)}
					>
						{comment.likedBy?.includes($user.uid) ? '❤️ Liked' : '🤍 Like'}
					</button>
				{/if}

				{#if comment.authorId === $user?.uid}
					<button
						class="btn btn-sm mt-1"
						on:click={() => {
							const newText = prompt('New text:', comment.text);
							if (newText !== null && comment.id) updateComment(comment.id, newText);
						}}
					>
						Edit
					</button>
					<button
						class="btn btn-sm mt-1"
						on:click={() => {
							if (comment.id) removeComment(comment.id);
						}}
					>
						Delete
					</button>
				{/if}
			</div>

			<div class="divider"></div>
		</div>
	{/each}
{:else}
	<p class="text-sm opacity-50">No comments yet. Be the first to comment!</p>
{/if}
