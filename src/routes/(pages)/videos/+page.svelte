<!-- src/routes/videos/+page.svelte -->
<script lang="ts">
	import type { Video } from '$lib/types/videos/Video';
	import { pageHeader, VideoUploadForm, VideoList, Toast } from '$lib';
	import { user } from '$lib/stores/authStore';
	import { onMount } from 'svelte';
	import { db } from '$lib/firebase';
	import { collection, getDocs, orderBy, query } from 'firebase/firestore';

	const { title, description, heading } = pageHeader.videos; // Ensure you have a videos section in pageHeader

	let videos: Video[] = [];
	let toastVisible = false;
	let toastMessage = '';
	let toastType: 'success' | 'error' = 'success';

	/**
	 * Fetches videos from Firestore ordered by creation date descending.
	 */
	const fetchVideos = async () => {
		try {
			const videosCollection = collection(db, 'videos');
			const videosQuery = query(videosCollection, orderBy('createdAt', 'desc'));
			const querySnapshot = await getDocs(videosQuery);
			videos = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data()
			})) as Video[];
		} catch (error) {
			console.error('Error fetching videos:', error);
			showToast('Failed to fetch videos.', 'error');
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
	 * Handles successful upload of a video.
	 * @param event - The custom event containing the new video.
	 */
	const onUploadSuccess = (event: CustomEvent<{ video: Video }>) => {
		const newVideo = event.detail.video;
		videos = [newVideo, ...videos];
		showToast('Upload successful!', 'success');
	};

	/**
	 * Handles upload failure.
	 */
	const onUploadFailure = () => {
		showToast('Upload failed. Please try again.', 'error');
	};

	onMount(async () => {
		await fetchVideos();
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<header>
	<h1>{heading}</h1>
	<p>{description}</p>
	<hr />
</header>

{#if $user}
	<div class="alert flex flex-col">
		<h2>Upload Video</h2>
		<p>Please make sure to enter a valid YouTube URL.</p>
		<VideoUploadForm on:uploadSuccess={onUploadSuccess} on:uploadFailure={onUploadFailure} />
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
		<span>Please sign in to upload your own videos.</span>
	</div>
{/if}

<VideoList {videos} />
<Toast isVisible={toastVisible} message={toastMessage} type={toastType} />
