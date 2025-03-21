<script lang="ts">
	import { db } from '$lib/firebase';
	import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/auth';
	import type { ForumPost } from '$lib/types/forum';
	import type { Timestamp } from 'firebase/firestore';

	const pageTitle = 'Forum';
	const pageDescription = 'Connect and share ideas in our community forum.';

	let newThreadTitle: string = '';
	let newThreadContent: string = '';
	let forumPosts: ForumPost[] = [];

	async function loadForumPosts() {
		try {
			const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
			const postsSnapshot = await getDocs(postsQuery);
			forumPosts = postsSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})) as ForumPost[];
		} catch (error) {
			console.error('Error loading posts:', error);
		}
	}

	async function createThread() {
		if (!newThreadTitle.trim() || !newThreadContent.trim()) return;
		try {
			const threadData = {
				title: newThreadTitle,
				content: newThreadContent,
				authorId: $user?.uid ?? '',
				authorName: $user?.displayName ?? 'Anonymous',
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp()
			};
			await addDoc(collection(db, 'posts'), threadData);
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

	// Helper function to format timestamps.
	function formatTimestamp(ts: Date | Timestamp | null): string {
		if (!ts) return '';
		if (typeof (ts as any).toDate === 'function') {
			return (ts as Timestamp).toDate().toLocaleString();
		}
		return (ts as Date).toLocaleString();
	}
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Header -->
<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

<!-- Create Thread Form / Login Prompt -->
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
	</section>
{/if}

<!-- Forum Posts List -->
<section>
	<h2>Forum Posts</h2>
	{#if forumPosts.length > 0}
		{#each forumPosts as post}
			<a class="hover:no-underline" href={`/forum/${post.id}`}>{post.title}</a>
			<div class="text-sm opacity-50">
				Posted by {post.authorName} on {formatTimestamp(post.createdAt)}
			</div>
			<div class="divider"></div>
		{/each}
	{:else}
		<p>No posts yet. Be the first to post!</p>
	{/if}
</section>
