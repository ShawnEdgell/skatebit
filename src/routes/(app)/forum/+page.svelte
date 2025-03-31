<script lang="ts">
	import { GoogleLoginButton } from '$lib/components';
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
	let sortOption: 'latest' | 'popular' = 'latest';

	async function loadForumPosts() {
		try {
			const posts = await getForumPosts();
			forumPosts =
				sortOption === 'popular'
					? [...posts].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
					: [...posts].sort((a, b) => {
							const dateA = a.createdAt instanceof Date ? a.createdAt : a.createdAt?.toDate?.();
							const dateB = b.createdAt instanceof Date ? b.createdAt : b.createdAt?.toDate?.();
							return (dateB?.getTime() || 0) - (dateA?.getTime() || 0);
						});
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
	<h1>{pageTitle} <span class="badge badge-sm lg:badge-md badge-info">Beta</span></h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

{#if $user}
	<section class="not-prose mt-6">
		<div class="card bg-base-300 p-2 shadow-lg">
			<div class="card-body space-y-4">
				<h2 class="card-title text-2xl font-bold">📝 Create Thread</h2>

				<form on:submit|preventDefault={createThread} class="space-y-3">
					<input
						type="text"
						bind:value={newThreadTitle}
						placeholder="Thread Title"
						class="input input-bordered w-full"
					/>

					<textarea
						bind:value={newThreadContent}
						placeholder="Thread Content"
						class="textarea textarea-bordered w-full"
					></textarea>

					<div class="card-actions w-full justify-end">
						<button type="submit" class="btn btn-primary w-full">Post Thread</button>
					</div>
				</form>
			</div>
		</div>
	</section>
{:else}
	<section class="not-prose mt-16">
		<div class="card bg-base-300 p-2 shadow-lg">
			<div class="card-body space-y-4 text-center">
				<p>To create posts or comment, please sign in.</p>
				<div>
					<GoogleLoginButton />
				</div>
			</div>
		</div>
	</section>
{/if}

<section>
	<h2 class="flex flex-wrap items-center justify-between gap-2">
		<span>Forum Posts</span>
		<select bind:value={sortOption} on:change={loadForumPosts} class="select select-sm w-24">
			<option value="latest">Latest</option>
			<option value="popular">Popular</option>
		</select>
	</h2>

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
