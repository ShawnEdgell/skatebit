<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { db, storage } from '$lib/firebase';
	import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
	import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { user } from '$lib/stores/authStore';
	import { get } from 'svelte/store';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const dispatch = createEventDispatcher();
	const toastStore = getToastStore();

	let title = '';
	let description = '';
	let file: File | null = null;
	let isUploading = false;
	let fileInput: HTMLInputElement | null = null;

	const handleSubmit = async () => {
		if (!title.trim() || !description.trim() || !file) {
			toastStore.trigger({
				message: 'Please fill in all fields.',
				background: 'variant-filled-error'
			});
			return;
		}
		isUploading = true;

		try {
			const $user = get(user);
			if (!$user) {
				toastStore.trigger({
					message: 'User not authenticated.',
					background: 'variant-filled-error'
				});
				isUploading = false;
				return;
			}
			const userId = $user.uid;
			const userName = $user.displayName || $user.email || 'Anonymous';

			// Upload file to Firebase Storage
			const filePath = `uploads/${userId}/${Date.now()}_${file.name}`;
			const fileRef = storageRef(storage, filePath);
			await uploadBytes(fileRef, file);
			const downloadURL = await getDownloadURL(fileRef);

			// Add post to Firestore
			await addDoc(collection(db, 'posts'), {
				title,
				description,
				fileURL: downloadURL,
				filePath,
				userId,
				userName,
				createdAt: serverTimestamp()
			});

			// Dispatch an event after successful upload
			dispatch('uploadSuccess');

			// Reset form fields
			title = '';
			description = '';
			file = null;
			if (fileInput) {
				fileInput.value = '';
			}

			// Show success toast
			toastStore.trigger({
				message: 'Upload successful!',
				background: 'variant-filled-success'
			});
		} catch (error) {
			console.error('Error uploading file:', error);
			const errorMessage =
				error instanceof Error
					? `Failed to upload: ${error.message}`
					: 'Failed to upload due to an unknown error.';
			toastStore.trigger({
				message: errorMessage,
				background: 'variant-filled-error'
			});
		} finally {
			isUploading = false;
		}
	};

	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		file = target.files?.[0] || null;
		console.log('Selected file:', file);
	};

	const cancelUpload = () => {
		title = '';
		description = '';
		file = null;
		if (fileInput) {
			fileInput.value = '';
		}
		dispatch('cancel'); // Dispatch 'cancel' event to parent
	};
</script>

<form class="w-full" on:submit|preventDefault={handleSubmit}>
	<input
		class="input mt-1 block w-full mb-4"
		type="text"
		placeholder="Enter title"
		bind:value={title}
		required
	/>

	<textarea
		class="textarea mt-1 block w-full mb-4"
		rows="4"
		placeholder="Enter description"
		bind:value={description}
		required
	></textarea>

	<input
		class="input mt-1 block w-full mb-4 text-base"
		type="file"
		accept=".zip"
		on:change={handleFileChange}
		required
		bind:this={fileInput}
	/>

	<div class="flex space-x-2 justify-center pt-2">
		<button class="btn variant-ghost" type="button" on:click={cancelUpload} disabled={isUploading}>
			Cancel
		</button>
		<button class="btn variant-filled-secondary" type="submit" disabled={isUploading}>
			{isUploading ? 'Uploading...' : 'Submit'}
		</button>
	</div>
</form>
