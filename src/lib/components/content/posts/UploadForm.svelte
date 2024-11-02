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
			const newPost = {
				title,
				description,
				fileURL: downloadURL,
				filePath,
				userId,
				userName,
				userPhotoURL,
				createdAt: serverTimestamp()
			};
			const postRef = await addDoc(collection(db, 'posts'), newPost);

			// Dispatch an event with the new post data
			dispatch('uploadSuccess', { post: { ...newPost, id: postRef.id, createdAt: new Date() } });

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

<form class="w-full space-y-4" on:submit|preventDefault={handleSubmit}>
	<input
		class="input input-bordered w-full"
		type="text"
		placeholder="Enter title"
		bind:value={title}
		required
	/>

	<textarea
		class="textarea textarea-bordered w-full"
		rows="4"
		placeholder="Enter description"
		bind:value={description}
		required
	></textarea>

	<input
		class="file-input input-bordered w-full"
		type="file"
		accept=".zip"
		on:change={handleFileChange}
		required
		bind:this={fileInput}
	/>

	<div class="flex justify-center w-full space-x-2">
		<button class="btn" type="button" on:click={cancelUpload} disabled={isUploading}>
			Cancel
		</button>
		<button class="btn btn-primary" type="submit" disabled={isUploading}>
			{isUploading ? 'Uploading...' : 'Submit'}
		</button>
	</div>
</form>
