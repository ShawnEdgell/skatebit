<script lang="ts">
	import Badge from '../../../components/Badge.svelte';
	import HowToInstallSection from './components/HowToInstallSection.svelte';
	import { user } from '$lib/stores/authStore';
	import { auth, googleProvider, db, storage } from '$lib/firebase';
	import { signInWithPopup, signOut } from 'firebase/auth';
	import {
		collection,
		addDoc,
		serverTimestamp,
		getDocs,
		query,
		orderBy,
		deleteDoc,
		doc,
		updateDoc
	} from 'firebase/firestore';
	import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
	import { onMount } from 'svelte';

	// Define the Post interface directly here
	interface Post {
		id: string;
		title: string;
		description: string;
		fileURL: string;
		filePath: string;
		userId: string;
		userName: string;
		createdAt: {
			seconds: number;
			nanoseconds: number;
		};
	}

	// Form state variables
	let title = '';
	let description = '';
	let file: File | null = null;
	let errorMessage = '';
	let isUploading = false;
	let isAuthLoading = false;
	let successMessage = '';

	// Reference to the file input element
	let fileInput: HTMLInputElement | null = null;

	// Posts state variables
	let posts: Post[] = [];
	let isLoadingPosts = true;
	let postsErrorMessage = '';

	// Editing state variables (if needed in the future)
	let isEditing = false;
	let editPostId: string | null = null;
	let editTitle = '';
	let editDescription = '';
	let isUpdating = false;

	// Authentication functions
	const login = async () => {
		isAuthLoading = true;
		errorMessage = '';
		try {
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			console.error('Error signing in with Google:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to sign in: ${error.message}`;
			} else {
				errorMessage = 'Failed to sign in due to an unknown error.';
			}
		} finally {
			isAuthLoading = false;
		}
	};

	const logout = async () => {
		isAuthLoading = true;
		errorMessage = '';
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Error signing out:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to sign out: ${error.message}`;
			} else {
				errorMessage = 'Failed to sign out due to an unknown error.';
			}
		} finally {
			isAuthLoading = false;
		}
	};

	// Handle form submission
	const handleSubmit = async () => {
		if (!title.trim() || !description.trim() || !file) {
			errorMessage = 'Please fill in all fields.';
			return;
		}
		isUploading = true;
		errorMessage = '';
		successMessage = '';

		try {
			// Ensure user is authenticated
			if (!$user) {
				errorMessage = 'User not authenticated.';
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

			// Reset form fields
			title = '';
			description = '';
			file = null;

			if (fileInput) {
				fileInput.value = ''; // Reset the file input element
			}

			// Display a success message
			successMessage = 'Upload successful!';

			// Refresh posts
			await fetchPosts();
		} catch (error) {
			console.error('Error uploading file:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to upload: ${error.message}`;
			} else {
				errorMessage = 'Failed to upload due to an unknown error.';
			}
		} finally {
			isUploading = false;
		}
	};

	// Handle file input change
	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			file = target.files[0];
		} else {
			file = null;
		}
	};

	// Cancel form submission
	const cancelUpload = () => {
		title = '';
		description = '';
		file = null;
		if (fileInput) {
			fileInput.value = ''; // Reset the file input element
		}
		errorMessage = '';
		successMessage = '';
	};

	// Fetch posts
	onMount(async () => {
		await fetchPosts();
	});

	const fetchPosts = async () => {
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
	};

	// Delete post function
	const deletePost = async (postId: string, filePath: string) => {
		if (!confirm('Are you sure you want to delete this post?')) {
			return;
		}

		try {
			// Delete the file from Firebase Storage
			const fileRef = storageRef(storage, filePath);
			await deleteObject(fileRef);

			// Delete the post from Firestore
			await deleteDoc(doc(db, 'posts', postId));

			// Remove the post from the local posts array
			posts = posts.filter((post) => post.id !== postId);
		} catch (error) {
			console.error('Error deleting post:', error);
			if (error instanceof Error) {
				postsErrorMessage = `Failed to delete post: ${error.message}`;
			} else {
				postsErrorMessage = 'Failed to delete post due to an unknown error.';
			}
		}
	};

	// Start edit mode
	const startEdit = (post: Post) => {
		isEditing = true;
		editPostId = post.id;
		editTitle = post.title;
		editDescription = post.description;
		successMessage = '';
		errorMessage = '';
	};

	// Cancel edit mode
	const cancelEdit = () => {
		isEditing = false;
		editPostId = null;
		editTitle = '';
		editDescription = '';
		errorMessage = '';
		successMessage = '';
	};

	// Update post function
	const updatePost = async (postId: string) => {
		if (!editTitle.trim() || !editDescription.trim()) {
			errorMessage = 'Please fill in all fields.';
			return;
		}
		isUpdating = true;
		errorMessage = '';
		successMessage = '';

		try {
			// Ensure user is authenticated
			if (!$user) {
				errorMessage = 'User not authenticated.';
				isUpdating = false;
				return;
			}

			// Update the post in Firestore
			await updateDoc(doc(db, 'posts', postId), {
				title: editTitle,
				description: editDescription
			});

			// Update the local posts array
			const index = posts.findIndex((post) => post.id === postId);
			if (index !== -1) {
				posts[index].title = editTitle;
				posts[index].description = editDescription;
			}

			// Exit edit mode
			isEditing = false;
			editPostId = null;
			editTitle = '';
			editDescription = '';

			// Display a success message
			successMessage = 'Post updated successfully!';
		} catch (error) {
			console.error('Error updating post:', error);
			if (error instanceof Error) {
				errorMessage = `Failed to update post: ${error.message}`;
			} else {
				errorMessage = 'Failed to update post due to an unknown error.';
			}
		} finally {
			isUpdating = false;
		}
	};
</script>

<svelte:head>
	<title>Skatebit | Stats & Settings</title>
	<meta name="description" content="Get the latest stats from Milky and the community." />
</svelte:head>

<header>
	<Badge />
	<h1>Stats & Settings</h1>
	<p>
		Download and share stats and settings for the XXL Mod, Boned Ollie Mod, Fro's Mod, XL Graphics,
		and more.
	</p>
</header>

<!-- Main Container -->
<hr />
<div class="flex flex-col items-center">
	{#if $user}
		<!-- Welcome Message -->
		<p class="mt-0 text-xl">Welcome, <strong>{$user.displayName || $user.email}!</strong></p>

		<!-- Logout Button -->
		<button class="btn variant-ghost" on:click={logout} disabled={isAuthLoading}>
			{#if isAuthLoading}
				Logging out...
			{:else}
				Logout
			{/if}
		</button>

		<!-- Upload Form -->
		<form class="w-full m-0 p-0" on:submit|preventDefault={handleSubmit}>
			<h2 class="mb-8">Upload a File</h2>
			<div class="mb-4">
				<input
					id="title"
					class="input mt-1 block w-full"
					type="text"
					placeholder="Enter title"
					bind:value={title}
					required
				/>
			</div>

			<!-- Description Textarea -->
			<div class="mb-4">
				<textarea
					id="description"
					class="textarea mt-1 block w-full"
					rows="4"
					placeholder="Enter description"
					bind:value={description}
					required
				></textarea>
			</div>

			<!-- File Input -->
			<div class="mb-4">
				<input
					id="file"
					class="input mt-1 block w-full text-base"
					type="file"
					accept=".zip"
					on:change={handleFileChange}
					required
					bind:this={fileInput}
				/>
			</div>

			<!-- Upload and Cancel Buttons -->
			<div class="flex space-x-2 justify-center pt-2">
				<button
					class="btn variant-ghost"
					type="button"
					on:click={cancelUpload}
					disabled={isUploading}
				>
					Cancel
				</button>
				<button class="btn variant-filled-secondary" type="submit" disabled={isUploading}>
					{#if isUploading}
						Uploading...
					{:else}
						Upload
					{/if}
				</button>
			</div>
		</form>
		<!-- Display Error Message -->
		{#if errorMessage}
			<p class="text-error-500">{errorMessage}</p>
		{/if}

		<!-- Display Success Message -->
		{#if successMessage}
			<p class="text-success-500">{successMessage}</p>
		{/if}
	{:else}
		<!-- Login Prompt -->

		<div class="text-center">
			<div class="mb-4 mt-0">Please sign-in to upload your own files.</div>
		</div>
		<button class="btn variant-ghost" on:click={login} disabled={isAuthLoading}>
			{#if isAuthLoading}
				Signing in...
			{:else}
				<svg
					class="w-5 h-5 inline-block mr-2"
					viewBox="-0.5 0 48 48"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					fill="#000000"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<title>Google-color</title>
						<desc>Created with Sketch.</desc>
						<defs></defs>
						<g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="Color-" transform="translate(-401.000000, -860.000000)">
								<g id="Google" transform="translate(401.000000, 860.000000)">
									<path
										d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
										id="Fill-1"
										fill="#FBBC05"
									></path>
									<path
										d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
										id="Fill-2"
										fill="#EB4335"
									></path>
									<path
										d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
										id="Fill-3"
										fill="#34A853"
									></path>
									<path
										d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
										id="Fill-4"
										fill="#4285F4"
									></path>
								</g>
							</g>
						</g>
					</g>
				</svg>
				<div>Sign-in with Google</div>
			{/if}
		</button>
	{/if}
</div>
<!-- Display Posts -->
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
				<a class="no-underline" href="/posts/{post.id}">
					<div class="card space-y-2 hover:bg-surface-hover-token font-normal p-4">
						<header class="card-header p-0 text-2xl text-secondary-500 font-semibold pb-1">
							{post.title}
						</header>
						<footer class="card-footer text-sm p-0">
							Posted by {post.userName} on {new Date(
								post.createdAt.seconds * 1000
							).toLocaleString()}
						</footer>
						<section class="text-base">
							{post.description.length > 100
								? `${post.description.slice(0, 100)}...`
								: post.description}
						</section>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
<hr />
<HowToInstallSection />
