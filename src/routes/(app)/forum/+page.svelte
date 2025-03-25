<script lang="ts">
	import GoogleLoginButton from '$lib/components/GoogleLoginButton.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import type { ForumPost } from '$lib/types/forum';
	import type { Timestamp } from 'firebase/firestore';

	import { getForumPosts, submitForumPost } from '$lib/firebase/forum';

	const pageTitle = 'Forum';
	const pageDescription = 'Connect and share ideas in our community forum.';

	let newThreadTitle: string = '';
	let newThreadContent: string = '';
	let forumPosts: ForumPost[] = [];

	async function loadForumPosts() {
		try {
			forumPosts = await getForumPosts();
		} catch (error) {
			console.error('Error loading posts:', error);
		}
	}

	async function createThread() {
		if (!newThreadTitle.trim() || !newThreadContent.trim()) return;
		try {
			await submitForumPost({
				title: newThreadTitle,
				content: newThreadContent,
				authorId: $user?.uid ?? '',
				authorName: $user?.displayName ?? 'Anonymous',
				authorAvatar: $user?.photoURL || 'https://via.placeholder.com/40'
			});
			newThreadTitle = '';
			newThreadContent = '';
			await loadForumPosts();
		} catch (error) {
			console.error('Error creating thread:', error);
		}
	}

	onMount(() => {
		loadForumPosts();
	});

	function formatTimestamp(ts: Date | Timestamp | null): string {
		if (!ts) return '';
		let date: Date;
		if ('toDate' in ts) {
			date = ts.toDate();
		} else {
			date = ts as Date;
		}
		const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
		return date.toLocaleDateString('en-US', options);
	}
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

{#if $user}
	<div class="card bg-base-200 card-lg px-6">
		<section class="flex items-center justify-between">
			<div class="flex items-center space-x-4">
				<img
					class="h-10 w-10 rounded-full"
					src={$user?.photoURL || 'https://via.placeholder.com/40'}
					alt={$user?.displayName || 'User'}
				/>
				<p>Welcome, {$user.displayName}!</p>
			</div>
			<GoogleLoginButton />
		</section>
	</div>
{/if}

{#if $user}
	<section>
		<h2>Create a New Thread</h2>
		<form on:submit|preventDefault={createThread}>
			<div>
				<input
					type="text"
					bind:value={newThreadTitle}
					placeholder="Thread Title"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="mt-2">
				<textarea
					bind:value={newThreadContent}
					placeholder="Thread Content"
					class="textarea textarea-bordered w-full"
				></textarea>
			</div>
			<div class="mt-2">
				<button type="submit" class="btn btn-primary">Post Thread</button>
			</div>
		</form>
	</section>
{:else}
	<section>
		<p>To create posts or comment, please log in.</p>
		<GoogleLoginButton />
	</section>
{/if}

<section>
	<h2>Forum Posts</h2>
	{#if forumPosts.length > 0}
		{#each forumPosts as post}
			<div class="flex items-center justify-between gap-4">
				<!-- Left side: Avatar + Title + Info -->
				<div class="not-prose flex flex-1 items-start gap-4">
					<img
						src={post.authorAvatar || 'https://via.placeholder.com/40'}
						alt={post.authorName}
						class="mt-1 h-8 w-8 rounded-full"
					/>

					<div>
						<a class="font-semibold underline hover:no-underline" href={`/forum/${post.id}`}>
							{post.title}
						</a>
						<div class="text-sm opacity-50">
							Posted by {post.authorName} on {formatTimestamp(post.createdAt)}
						</div>
					</div>
				</div>

				<!-- Right side: Likes + Comments -->
				<div class="flex items-center gap-4 text-sm">
					{#if post.likes > 0}
						<span class="text-success">❤️ {post.likes}</span>
					{/if}
					<span class="opacity-50">💬 {post.commentsCount ?? 0}</span>
				</div>
			</div>
			<div class="divider"></div>
		{/each}
	{:else}
		<p class="text-sm opacity-50">No posts yet. Be the first to post!</p>
	{/if}
</section>
