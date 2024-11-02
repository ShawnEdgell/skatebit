<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { db, storage } from '$lib/firebase';
	import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
	import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
	import { user } from '$lib/stores/authStore';
	import { get } from 'svelte/store';

	const dispatch = createEventDispatcher();

	let title = '';
	let description = '';
	let file: File | null = null;
	let isUploading = false;
	let fileInput: HTMLInputElement | null = null;

	const handleSubmit = async () => {
		if (!title.trim() || !description.trim() || !file) {
			console.error('Please fill in all fields.');
			return;
		}
		isUploading = true;

		try {
			const $user = get(user);
			if (!$user) {
				console.error('User not authenticated.');
				isUploading = false;
				return;
			}
			const userId = $user.uid;
			const userName = $user.displayName || $user.email || 'Anonymous';
			const userPhotoURL = $user.photoURL || null;

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
				userPhotoURL,
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
			console.log('Upload successful!');
		} catch (error) {
			console.error('Error uploading file:', error);
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
