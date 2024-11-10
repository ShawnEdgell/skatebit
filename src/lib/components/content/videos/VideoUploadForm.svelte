<!-- src/lib/components/content/videos/VideoUploadForm.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { db } from '$lib/firebase';
	import { addDoc, collection, serverTimestamp, getDoc, doc } from 'firebase/firestore';
	import { user } from '$lib/stores/authStore';
	import { get } from 'svelte/store';
	import type { Video } from '$lib/types/videos/Video';

	const dispatch = createEventDispatcher();

	let title = '';
	let youtubeURL = '';
	let isUploading = false;

	const handleSubmit = async () => {
		if (!title.trim() || !isValidYouTubeURL(youtubeURL)) {
			console.error('Please fill in all fields with a valid YouTube URL.');
			dispatch('uploadFailure');
			return;
		}
		isUploading = true;

		try {
			const $user = get(user);
			if (!$user) {
				console.error('User not authenticated.');
				dispatch('uploadFailure');
				isUploading = false;
				return;
			}
			const userId = $user.uid;
			const userName = $user.displayName || $user.email || 'Anonymous';
			const userPhotoURL = $user.photoURL || null;

			// Add video to Firestore with serverTimestamp
			const newVideo = {
				title,
				youtubeURL,
				userId,
				userName,
				userPhotoURL,
				createdAt: serverTimestamp()
			};
			const videoRef = await addDoc(collection(db, 'videos'), newVideo);

			// Fetch the newly created document to get the serverTimestamp
			const docSnap = await getDoc(doc(db, 'videos', videoRef.id));
			if (docSnap.exists()) {
				const uploadedVideo = docSnap.data() as Video;
				dispatch('uploadSuccess', { video: { ...uploadedVideo, id: videoRef.id } });
			} else {
				// If for some reason the document doesn't exist, dispatch with minimal info
				dispatch('uploadSuccess', { video: { ...newVideo, id: videoRef.id, createdAt: null } });
			}

			// Reset form fields
			title = '';
			youtubeURL = '';
			console.log('Upload successful!');
		} catch (error) {
			console.error('Error uploading video:', error);
			dispatch('uploadFailure');
		} finally {
			isUploading = false;
		}
	};

	const isValidYouTubeURL = (url: string): boolean => {
		const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
		return regex.test(url);
	};

	const cancelUpload = () => {
		title = '';
		youtubeURL = '';
		dispatch('cancel'); // Dispatch 'cancel' event to parent
	};
</script>

<form class="w-full space-y-4" on:submit|preventDefault={handleSubmit}>
	<input
		min="1"
		max="25"
		class="input input-bordered w-full"
		type="text"
		placeholder="Enter title"
		bind:value={title}
		required
	/>

	<input
		class="input input-bordered w-full"
		type="url"
		placeholder="Enter YouTube URL"
		bind:value={youtubeURL}
		required
	/>

	<div class="flex justify-center w-full space-x-2">
		<button class="btn btn-neutral" type="button" on:click={cancelUpload} disabled={isUploading}>
			Cancel
		</button>
		<button class="btn btn-primary" type="submit" disabled={isUploading}>
			{isUploading ? 'Uploading...' : 'Submit'}
		</button>
	</div>
</form>
