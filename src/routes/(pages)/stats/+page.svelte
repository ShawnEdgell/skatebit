<!-- src/routes/stats/+page.svelte -->
<script lang="ts">
	import type { Post } from '$lib/types';
	import { pageHeader, Help, UploadForm, PostList, Toast, SiteAlert } from '$lib';
	import { user } from '$lib/stores/authStore';
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs, orderBy, query } from 'firebase/firestore';

	const { title, description, heading } = pageHeader.stats;

	let posts: Post[] = [];
	let toastVisible = false;
	let toastMessage = '';
	let toastType: 'success' | 'error' = 'success';

	/**
	 * Fetches posts from Firestore ordered by creation date descending.
	 */
	const fetchPosts = async () => {
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
			showToast('Failed to fetch posts.', 'error');
		}
	};

	/**
	 * Displays a toast notification.
	 * @param message - The message to display.
	 * @param type - The type of toast ('success' or 'error').
	 */
	const showToast = (message: string, type: 'success' | 'error') => {
		toastMessage = message;
		toastType = type;
		toastVisible = true;
		setTimeout(() => (toastVisible = false), 3000); // Hide toast after 3 seconds
	};

	/**
	 * Handles successful upload of a post.
	 * @param event - The custom event containing the new post.
	 */
	const onUploadSuccess = (event: CustomEvent<{ post: Post }>) => {
		const newPost = event.detail.post;
		posts = [newPost, ...posts];
		showToast('Upload successful!', 'success');
	};

	/**
	 * Handles upload failure.
	 */
	const onUploadFailure = () => {
		showToast('Upload failed. Please try again.', 'error');
	};

	onMount(async () => {
		await fetchPosts();
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<header>
	<h1>{heading}</h1>
	<p>{description}</p>
	<Help />
	<hr />
</header>

<SiteAlert />

<!-- {#if $user}
	<div class="alert flex flex-col">
		<h2>Upload Stats</h2>
		<p>Please make sure to only upload <strong>.ZIP</strong> files.</p>
		<UploadForm on:uploadSuccess={onUploadSuccess} on:uploadFailure={onUploadFailure} />
	</div>
{:else}
	<div role="alert" class="alert flex justify-center flex-wrap">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 inline-block mr-2 stroke-current"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<span>Please sign in to upload your own files.</span>
	</div>
{/if} -->

<div>
	<h3>Basic Realistic Settings (Goofy and Regular)</h3>
	<p>A good starting point for building your own stats.</p>
	<li>
		<a
			class="text-blue-500 underline"
			href="https://damp-limit-8cd1.milky-irl.workers.dev/BasicRealisticSettings.zip"
			download>Download</a
		>
	</li>
</div>
<div>
	<h3>Milky's Latest Stats (Regular)</h3>
	<p>14 Gravity. Latest stats as seen in recent streams and videos.</p>
	<li>
		<a
			class="text-blue-500 underline"
			href="https://damp-limit-8cd1.milky-irl.workers.dev/MilkyLatest.zip"
			download>Download</a
		>
	</li>
</div>

<!-- <PostList {posts} /> -->
<Toast isVisible={toastVisible} message={toastMessage} type={toastType} />
