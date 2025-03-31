<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import {
		getClipById,
		getClipComments,
		addClipComment,
		likeClipPost,
		likeClipComment,
		editClipComment,
		deleteClipComment,
		deleteClipPost
	} from '$lib/firebase/clips';
	import { GoogleLoginButton, VideoItem } from '$lib/components';
	import { formatDate } from '$lib/utils/formatDate';
	import type { ClipPost, ClipComment } from '$lib/types/clips';
	import { getCurrentWeekId } from '$lib/utils/week';
	import { getUserClipThisWeek } from '$lib/firebase/clips';

	let clip: ClipPost | null = null;
	let comments: ClipComment[] = [];
	let newComment = '';
	let loading = true;
	let clipId: string = '';

	$: clipId = $page.params.id;

	onMount(async () => {
		if (!clipId) return;
		clip = await getClipById(clipId);
		comments = await getClipComments(clipId);
		loading = false;
	});

	async function createComment() {
		if (!newComment.trim()) return;
		if (!$user || !clipId) return;
		await addClipComment(clipId, {
			clipId: clipId,
			text: newComment,
			authorId: $user.uid,
			authorName: $user.displayName || 'Anonymous',
			authorAvatar: $user.photoURL || ''
		});
		newComment = '';
		comments = await getClipComments(clipId);
	}

	async function toggleLike() {
		if (!clipId || !$user?.uid) return;
		await likeClipPost(clipId, $user.uid);
		clip = await getClipById(clipId);
	}

	async function toggleLikeComment(id: string | undefined) {
		if (!clipId || !id || !$user?.uid) return;
		await likeClipComment(clipId, id, $user.uid);
		comments = await getClipComments(clipId);
	}

	async function editComment(id: string | undefined, text: string) {
		if (!clipId || !id) return;
		await editClipComment(clipId, id, text);
		comments = await getClipComments(clipId);
	}

	async function removeComment(id: string | undefined) {
		if (!clipId || !id) return;
		const confirmed = window.confirm('Are you sure you want to delete this comment?');
		if (!confirmed) return;
		await deleteClipComment(clipId, id);
		comments = await getClipComments(clipId);
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
		await deleteClipPost(clipId);

		if ($user) {
			const weekId = getCurrentWeekId();
			await waitForDeletionToPropagate($user.uid, weekId);
		}

		// Use SPA-style navigation after confirming deletion
		goto('/cotw');
	}
</script>

<svelte:head>
	<title>Skatebit | Clip</title>
	<meta name="description" content="Watch this week's submitted skate clip." />
</svelte:head>

<a href="/cotw" class="btn btn-soft mb-6 no-underline">Back to Clips</a>

{#if loading}
	<p>Loading clip...</p>
{:else if clip}
	<VideoItem video={clip} />

	<div class="not-prose my-6 flex items-center gap-2">
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
	</div>

	{#if $user}
		<button class="btn btn-sm" on:click={toggleLike}>
			{clip.likedBy?.includes($user.uid) ? '❤️ Liked' : '🤍 Like'}
		</button>
	{/if}

	{#if clip.uid === $user?.uid}
		<button class="btn btn-sm" on:click={removeClip}>Delete</button>
	{/if}
{:else}
	<p>Clip not found.</p>
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
					<button class="btn btn-sm mt-1" on:click={() => removeComment(comment.id)}>Delete</button>
				{/if}
			</div>
			<div class="divider"></div>
		</div>
	{/each}
{:else}
	<p class="text-sm opacity-50">No comments yet. Be the first to comment!</p>
{/if}
