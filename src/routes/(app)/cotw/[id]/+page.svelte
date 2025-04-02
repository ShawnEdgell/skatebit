<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import { showToast } from '$lib/utils/toast';
	import {
		getClipById,
		getClipComments,
		addClipComment,
		likeClipPost,
		likeClipComment,
		editClipComment,
		deleteClipComment,
		deleteClipPost,
		getUserClipThisWeek
	} from '$lib/firebase/clips';
	import { GoogleLoginButton, VideoCard } from '$lib/components';
	import { formatDate } from '$lib/utils/formatDate';
	import { getCurrentWeekId } from '$lib/utils/week';
	import type { ClipPost, ClipComment } from '$lib/types/clips';
	import type { Timestamp } from 'firebase/firestore';

	let clip: ClipPost | null = null;
	let comments: ClipComment[] = [];
	let newComment = '';
	let loading = true;
	let clipId: string = '';

	$: clipId = $page.params.id;

	onMount(async () => {
		if (!clipId) return;
		clip = await getClipById(clipId);
		comments = (await getClipComments(clipId)).sort(
			(a, b) => toMillis(a.createdAt) - toMillis(b.createdAt)
		);
		loading = false;
	});

	function toMillis(date: Date | Timestamp | null | undefined): number {
		if (!date) return 0;
		if (typeof (date as Timestamp).toMillis === 'function') {
			return (date as Timestamp).toMillis();
		}
		return (date as Date).getTime();
	}

	async function createComment() {
		if (!newComment.trim()) {
			showToast('Comment cannot be empty.', 'error');
			return;
		}
		if (!$user || !clipId) return;

		try {
			await addClipComment(clipId, {
				clipId,
				text: newComment,
				authorId: $user.uid,
				authorName: $user.displayName || 'Anonymous',
				authorAvatar: $user.photoURL || ''
			});
			newComment = '';
			comments = (await getClipComments(clipId)).sort(
				(a, b) => toMillis(a.createdAt) - toMillis(b.createdAt)
			);
			showToast('Comment posted!', 'success');
		} catch (err) {
			console.error(err);
			showToast('Failed to post comment.', 'error');
		}
	}

	async function toggleLike() {
		if (!clipId || !$user?.uid) return;
		await likeClipPost(clipId, $user.uid);
		clip = await getClipById(clipId);
	}

	async function toggleLikeComment(id: string | undefined) {
		if (!clipId || !id || !$user?.uid) return;
		await likeClipComment(clipId, id, $user.uid);
		comments = (await getClipComments(clipId)).sort(
			(a, b) => toMillis(a.createdAt) - toMillis(b.createdAt)
		);
	}

	async function editComment(id: string | undefined, text: string) {
		if (!clipId || !id) return;
		try {
			await editClipComment(clipId, id, text);
			comments = (await getClipComments(clipId)).sort(
				(a, b) => toMillis(a.createdAt) - toMillis(b.createdAt)
			);
			showToast('Comment updated.', 'info');
		} catch (err) {
			console.error(err);
			showToast('Failed to update comment.', 'error');
		}
	}

	async function removeComment(id: string | undefined) {
		if (!clipId || !id) return;
		const confirmed = window.confirm('Are you sure you want to delete this comment?');
		if (!confirmed) return;

		try {
			await deleteClipComment(clipId, id);
			comments = (await getClipComments(clipId)).sort(
				(a, b) => toMillis(a.createdAt) - toMillis(b.createdAt)
			);
			showToast('Comment deleted.', 'info');
		} catch (err) {
			console.error(err);
			showToast('Failed to delete comment.', 'error');
		}
	}

	async function waitForDeletionToPropagate(uid: string, weekId: string) {
		for (let i = 0; i < 10; i++) {
			const exists = await getUserClipThisWeek(uid, weekId);
			if (!exists) return true;
			await new Promise((r) => setTimeout(r, 250));
		}
		console.warn('⚠️ Deletion not reflected in Firestore after multiple attempts');
		return false;
	}

	async function removeClip() {
		if (!clipId) return;
		const confirmed = window.confirm('Are you sure you want to delete this clip?');
		if (!confirmed) return;

		try {
			await deleteClipPost(clipId);
			if ($user) {
				const weekId = getCurrentWeekId();
				await waitForDeletionToPropagate($user.uid, weekId);
			}
			sessionStorage.setItem(
				'__toast',
				JSON.stringify({
					message: 'Clip deleted.',
					type: 'info',
					visible: true
				})
			);
			goto('/cotw');
		} catch (err) {
			console.error(err);
			showToast('Failed to delete clip.', 'error');
		}
	}
</script>

<svelte:head>
	<title>Skatebit | Clip</title>
	<meta name="description" content="Watch this week's submitted skate clip." />
</svelte:head>

<div>
	<a href="/cotw" class="btn btn-soft mb-6 no-underline">Back to Clips</a>

	<!-- Video Display or Placeholder -->
	<div class="bg-base-300 relative aspect-[16/9] w-full overflow-hidden">
		{#if loading}
			<div class="absolute inset-0 flex items-center justify-center">
				<span class="loading loading-spinner loading-lg text-primary"></span>
			</div>
		{:else if clip}
			<VideoCard video={clip} />
		{/if}
	</div>

	<!-- Uploader Info or Placeholder -->
	<div class="not-prose my-6 flex items-center gap-2">
		{#if loading}
			<!-- SVG avatar placeholder -->
			<svg
				class="text-base-content/40 h-8 w-8"
				fill="currentColor"
				viewBox="-8 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
				stroke="none"
			>
				<path
					d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
				/>
			</svg>
			<span class="text-sm opacity-50">Loading uploader info...</span>
		{:else if clip}
			<img
				src={clip.userPhotoURL || 'https://via.placeholder.com/40'}
				alt={clip.userDisplayName}
				class="h-8 w-8 rounded-full"
			/>
			<span class="text-sm opacity-50">
				Uploaded by {clip.userDisplayName} on {formatDate(clip.timestamp)}
			</span>
			{#if (clip.likes ?? 0) > 0}
				<span class="text-success text-sm">+{clip.likes}</span>
			{/if}
		{/if}
	</div>

	<!-- Buttons -->
	<div class="mb-4 flex flex-wrap gap-2">
		{#if loading}
			<button class="btn btn-sm btn-disabled">Like</button>
			<button class="btn btn-sm btn-disabled">Delete</button>
		{:else if $user}
			<button class="btn btn-sm" on:click={toggleLike}>
				{clip?.likedBy?.includes($user.uid) ? '❤️ Liked' : '🤍 Like'}
			</button>

			{#if clip?.uid === $user.uid}
				<button class="btn btn-sm" on:click={removeClip}>Delete</button>
			{/if}
		{/if}
	</div>

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
		{#each comments as comment, i (comment.id)}
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
						{#if (comment.likes ?? 0) > 0}
							<span class="text-success text-sm">+{comment.likes}</span>
						{/if}
					</p>
				</div>
				<div>
					<p>{comment.text}</p>

					{#if $user}
						<button class="btn btn-sm mt-1" on:click={() => toggleLikeComment(comment.id)}>
							{comment.likedBy?.includes($user.uid) ? '❤️ Liked' : '🤍 Like'}
						</button>
					{/if}

					{#if comment.authorId === $user?.uid}
						<button
							class="btn btn-sm mt-1"
							on:click={() => {
								const newText = prompt('New text:', comment.text);
								if (newText !== null) editComment(comment.id, newText);
							}}
						>
							Edit
						</button>
						<button class="btn btn-sm mt-1" on:click={() => removeComment(comment.id)}>
							Delete
						</button>
					{/if}
				</div>

				{#if i < comments.length - 1}
					<div class="divider"></div>
				{/if}
			</div>
		{/each}
	{:else}
		<p class="text-sm opacity-50">No comments yet. Be the first to comment!</p>
	{/if}
</div>
