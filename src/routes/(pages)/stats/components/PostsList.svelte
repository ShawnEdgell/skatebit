<script lang="ts">
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs, orderBy, query } from 'firebase/firestore';
	import PostCard from './PostCard.svelte';
	import type { Post } from '$lib/types/Post';

	export let posts: Post[] = [];
	let isLoadingPosts = true;
	let postsErrorMessage = '';

	export async function fetchPosts() {
		isLoadingPosts = true;
		postsErrorMessage = '';
		try {
			const postsCollection = collection(db, 'posts');
			const postsQuery = query(postsCollection, orderBy('createdAt', 'desc'));
			const querySnapshot = await getDocs(postsQuery);
			posts = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})) as Post[];
		} catch (error) {
			console.error('Error fetching posts:', error);
			if (error instanceof Error) {
				postsErrorMessage = `Failed to load posts: ${error.message}`;
			} else {
				postsErrorMessage = 'Failed to load posts due to an unknown error.';
			}
		} finally {
			isLoadingPosts = false;
		}
	}

	onMount(async () => {
		await fetchPosts();
	});
</script>

<div class="flex flex-col w-full">
	<h2>Downloads</h2>
	{#if isLoadingPosts}
		<p>Loading posts...</p>
	{:else if postsErrorMessage}
		<p class="text-error-500">{postsErrorMessage}</p>
	{:else if posts.length === 0}
		<p>No posts available.</p>
	{:else}
		<div class="w-full flex flex-col space-y-4">
			{#each posts as post}
				<PostCard {post} />
			{/each}
		</div>
	{/if}
</div>
