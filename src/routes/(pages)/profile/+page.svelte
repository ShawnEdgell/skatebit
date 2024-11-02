<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/authStore';
	import { db } from '$lib/firebase';
	import {
		collection,
		doc,
		setDoc,
		getDoc,
		query,
		where,
		getDocs,
		updateDoc
	} from 'firebase/firestore';

	let youtube = '';
	let twitch = '';
	let discord = '';
	let instagram = '';
	let tiktok = '';
	let username = '';
	let isLoading = true;

	// Fetch user profile data once the component is mounted
	onMount(async () => {
		const userValue = $user;
		if (userValue) {
			try {
				const userDocRef = doc(collection(db, 'users'), userValue.uid);
				const userDoc = await getDoc(userDocRef);

				if (userDoc.exists()) {
					const userData = userDoc.data();
					youtube = userData.youtube ?? '';
					twitch = userData.twitch ?? '';
					discord = userData.discord ?? '';
					instagram = userData.instagram ?? '';
					tiktok = userData.tiktok ?? '';
					username = userData.username ?? '';
				} else {
					console.warn('No user data found in Firestore.');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		} else {
			console.warn('User not logged in.');
		}
		isLoading = false; // Data fetch complete
	});

	const saveProfile = async () => {
		const userValue = $user; // Get the user value from the store
		if (userValue) {
			try {
				const userDocRef = doc(collection(db, 'users'), userValue.uid);

				// Update user profile in Firestore
				await setDoc(
					userDocRef,
					{
						youtube,
						twitch,
						discord,
						instagram,
						tiktok,
						username
					},
					{ merge: true }
				);

				// Also update all posts created by this user with the new username
				const postsCollectionRef = collection(db, 'posts');
				const postsQuery = query(postsCollectionRef, where('userId', '==', userValue.uid));
				const querySnapshot = await getDocs(postsQuery);

				for (const postDoc of querySnapshot.docs) {
					await updateDoc(postDoc.ref, {
						userName: username || userValue.displayName || userValue.email || 'Anonymous'
					});
				}

				alert('Profile information saved successfully!');
			} catch (error) {
				console.error('Error saving user data:', error);
			}
		}
	};
</script>

<main>
	{#if $user}
		{#if isLoading}
			<p>Loading profile data...</p>
		{:else}
			<h1>Welcome, {username ? username : $user.displayName}!</h1>
			<p>We're glad to see you here.</p>

			<form on:submit|preventDefault={saveProfile} class="space-y-4">
				<div>
					<label for="username" class="block font-medium">Username</label>
					<input
						id="username"
						type="text"
						bind:value={username}
						class="input input-bordered w-full"
					/>
					<small class="block text-gray-500 mt-1"
						>This username will replace your default Google account name.</small
					>
				</div>

				<div>
					<label for="youtube" class="block font-medium">YouTube Channel</label>
					<input
						id="youtube"
						type="text"
						bind:value={youtube}
						class="input input-bordered w-full"
					/>
				</div>
				<div>
					<label for="twitch" class="block font-medium">Twitch Channel</label>
					<input id="twitch" type="text" bind:value={twitch} class="input input-bordered w-full" />
				</div>
				<div>
					<label for="discord" class="block font-medium">Discord Channel</label>
					<input
						id="discord"
						type="text"
						bind:value={discord}
						class="input input-bordered w-full"
					/>
				</div>
				<div>
					<label for="instagram" class="block font-medium">Instagram</label>
					<input
						id="instagram"
						type="text"
						bind:value={instagram}
						class="input input-bordered w-full"
					/>
				</div>
				<div>
					<label for="tiktok" class="block font-medium">TikTok</label>
					<input id="tiktok" type="text" bind:value={tiktok} class="input input-bordered w-full" />
				</div>
				<button type="submit" class="btn btn-primary mt-4">Save Profile</button>
			</form>
		{/if}
	{:else}
		<p>User not logged in.</p>
	{/if}
</main>
