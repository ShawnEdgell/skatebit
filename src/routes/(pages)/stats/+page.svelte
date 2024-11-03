<script lang="ts">
	import { pageHeader, Help } from '$lib';
	import { UploadForm, PostList } from '$lib';
	import { user } from '$lib/stores/authStore';
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs, orderBy, query } from 'firebase/firestore';
	import type { Post } from '$lib'; // Importing the Post type

	const { title, description, heading } = pageHeader.stats;

	let posts: Post[] = []; // Explicitly set type as Post[]
	let toastVisible = false;
	let toastMessage = '';
	let toastType = 'success'; // Controls the style of the toast (e.g., success, error)

	// Fetch the initial set of posts when the page loads
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

	// Show toast with a message and type (success or error)
	const showToast = (message: string, type: 'success' | 'error') => {
		toastMessage = message;
		toastType = type;
		toastVisible = true;
		setTimeout(() => (toastVisible = false), 3000); // Hide toast after 3 seconds
	};

	// Handle successful upload and add it to the posts list
	const onUploadSuccess = (event: CustomEvent<{ post: Post }>) => {
		const newPost = event.detail.post;
		posts = [newPost, ...posts]; // Add the new post to the beginning of the posts list
		showToast('Upload successful!', 'success');
	};

	// Handle upload failure
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

<section>
	<h1>{heading}</h1>
	<p>{description}</p>
	<Help />
	<hr />
</section>

{#if $user}
	<h2>Upload Stats</h2>
	<p>Please make sure to only upload <strong>.ZIP</strong> files.</p>
	<UploadForm on:uploadSuccess={onUploadSuccess} on:uploadFailure={onUploadFailure} />
{:else}
	<div role="alert" class="alert alert-warning">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-current"
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
{/if}

<!-- Always show PostList for all users -->
<PostList {posts} />

{#if toastVisible}
	<div class="toast toast-center">
		<div class="alert alert-{toastType}">
			<span>{toastMessage}</span>
		</div>
	</div>
{/if}
