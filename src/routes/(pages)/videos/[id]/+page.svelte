<!-- src/routes/videos/[id]/+page.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { pageHeader } from '$lib'; // Correct import path
	import { page } from '$app/stores';
	import { user } from '$lib/stores/authStore';
	import { db } from '$lib/firebase';
	import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
	import type { Video } from '$lib/types/videos/Video';
	import Comments from '$lib/components/content/general/Comments.svelte'; // Correct import path

	const { title, description } = pageHeader.video;

	let videoId: string;
	let video: Video | null = null;
	let isLoading = true;
	let errorMessage = '';
	let isUpdating = false;
	let isDeleting = false;

	// Variables for edit mode
	let isEditing = false;
	let editTitle = '';

	// Subscribe to the page store to get videoId
	const unsubscribe = page.subscribe(($page) => {
		videoId = $page.params.id;
	});

	// Clean up the subscription when component is destroyed
	onDestroy(() => {
		unsubscribe();
	});

	onMount(async () => {
		await fetchVideo();
	});

	const fetchVideo = async () => {
		isLoading = true;
		errorMessage = '';
		try {
			const docRef = doc(db, 'videos', videoId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				video = { id: docSnap.id, ...docSnap.data() } as Video;
			} else {
				errorMessage = 'Video not found.';
			}
		} catch (error) {
			console.error('Error fetching video:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to load video: ${error.message}`;
			} else {
				errorMessage = 'Failed to load video due to an unknown error.';
			}
		} finally {
			isLoading = false;
		}
	};

	const startEdit = () => {
		if (video) {
			isEditing = true;
			editTitle = video.title;
		}
	};

	const cancelEdit = () => {
		isEditing = false;
		editTitle = '';
		errorMessage = '';
	};

	const updateVideo = async () => {
		if (!editTitle) {
			errorMessage = 'Please fill in all fields.';
			return;
		}
		isUpdating = true;
		errorMessage = '';

		try {
			if (!$user) {
				errorMessage = 'User not authenticated.';
				isUpdating = false;
				return;
			}

			await updateDoc(doc(db, 'videos', videoId), {
				title: editTitle
			});

			// Update the local video object
			if (video) {
				video.title = editTitle;
			}

			isEditing = false;
		} catch (error) {
			console.error('Error updating video:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to update video: ${error.message}`;
			} else {
				errorMessage = 'Failed to update video due to an unknown error.';
			}
		} finally {
			isUpdating = false;
		}
	};

	const deleteVideo = async () => {
		if (!confirm('Are you sure you want to delete this video?')) {
			return;
		}
		isDeleting = true;
		errorMessage = '';

		try {
			if (!$user) {
				errorMessage = 'User not authenticated.';
				isDeleting = false;
				return;
			}

			// Delete the video from Firestore
			await deleteDoc(doc(db, 'videos', videoId));

			// Redirect to the videos page
			window.location.href = '/videos';
		} catch (error) {
			console.error('Error deleting video:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to delete video: ${error.message}`;
			} else {
				errorMessage = 'Failed to delete video due to an unknown error.';
			}
		} finally {
			isDeleting = false;
		}
	};

	const isValidYouTubeURL = (url: string): boolean => {
		// Validate embed URL
		const regex = /^https:\/\/www\.youtube\.com\/embed\/[A-Za-z0-9_-]{11}$/;
		return regex.test(url);
	};

	// Optional: Fallback to embed URL if not already in embed format
	const getEmbedURL = (url: string): string => {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
		const match = url.match(regex);
		if (match && match[1]) {
			return `https://www.youtube.com/embed/${match[1]}`;
		}
		return url; // Fallback to original URL or handle error
	};
</script>

<svelte:head>
	<title>{title} - {video ? video.title : 'Video'}</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="mb-8">
	<a href="/videos">Back to Videos</a>
</div>

{#if isLoading}
	<p>Loading video...</p>
{:else if errorMessage}
	<p class="text-error">{errorMessage}</p>
{:else if video}
	{#if isEditing}
		<!-- Edit Form -->
		<form class="space-y-4" on:submit|preventDefault={updateVideo}>
			<div>
				<input
					class="input input-bordered w-full"
					type="text"
					placeholder="Title"
					bind:value={editTitle}
					required
				/>
			</div>
			<div class="flex justify-center space-x-2">
				<button class="btn" type="button" on:click={cancelEdit}>Cancel</button>
				<button class="btn btn-primary" type="submit" disabled={isUpdating}>
					{#if isUpdating}
						Updating...
					{:else}
						Update
					{/if}
				</button>
			</div>
		</form>
	{:else}
		<!-- Display Video -->
		<header>
			<h1>{video.title}</h1>
			<p class="flex items-center gap-2">
				{#if video.userPhotoURL}
					<img src={video.userPhotoURL} class="w-6 h-6 m-0 rounded-full" alt="Profile" />
				{/if}
				<span>
					Uploaded by {video.userName} on {new Date(
						video.createdAt.seconds * 1000
					).toLocaleString()}
				</span>
			</p>
			<!-- Embedded YouTube Video -->
			<div class="relative aspect-[16/9] w-full">
				<iframe
					class="w-full h-full card"
					width="100%"
					height="400"
					src={getEmbedURL(video.youtubeURL)}
					title={video.title}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
					picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
			<!-- Show edit/delete buttons if current user is the original uploader -->
			{#if $user && $user.uid === video.userId}
				<div class="mt-4 flex space-x-2">
					<button on:click={startEdit} class="btn btn-sm btn-warning">Edit</button>
					<button on:click={deleteVideo} class="btn btn-sm btn-error" disabled={isDeleting}>
						{#if isDeleting}
							Deleting...
						{:else}
							Delete
						{/if}
					</button>
				</div>
			{/if}
		</header>
	{/if}
{/if}

<hr />

<!-- Comments Section -->
<Comments parentId={videoId} parentType="videos" />
