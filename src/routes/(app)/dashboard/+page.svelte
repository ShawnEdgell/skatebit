<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';
	import { getUserProfile, updateUserProfile } from '$lib/firebase/users';
	import type { UserProfile } from '$lib/types/users';
	import { showToast } from '$lib/utils/toast';
	import { authReady } from '$lib/stores/auth';

	let profile: Partial<UserProfile> = {
		links: {}
	};
	let loading = true;
	let saving = false;

	const pageTitle = 'Dashboard';
	const pageDescription = 'Update your profile information and social links.';

	// Redirect if not logged in
	$: if (authReady && $user === null && !loading) goto('/');

	onMount(() => {
		const unsubscribe = authReady.subscribe(async (ready) => {
			if (ready && $user) {
				const existingProfile = await getUserProfile($user.uid);

				profile = {
					displayName: $user.displayName || '',
					photoURL: $user.photoURL || '',
					...existingProfile
				};

				profile.links = {
					youtube: existingProfile?.links?.youtube ?? '',
					instagram: existingProfile?.links?.instagram ?? '',
					discord: existingProfile?.links?.discord ?? '',
					tiktok: existingProfile?.links?.tiktok ?? ''
				};

				loading = false;
			}
		});

		return unsubscribe;
	});

	async function saveProfile() {
		if (!$user) return;
		saving = true;

		try {
			await updateUserProfile($user.uid, profile);
			showToast('Profile updated!', 'success');
		} catch (error) {
			console.error('Error saving profile:', error);
			showToast('Failed to save profile.', 'error');
		} finally {
			saving = false;
		}
	}
</script>

<svelte:head>
	<title>Skatebit | {pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<section>
	<h1>{pageTitle}</h1>
	<p>{pageDescription}</p>
	<div class="divider"></div>
</section>

{#if loading}
	<section
		class="card bg-base-200 not-prose mx-auto flex min-h-[500px] max-w-2xl items-center justify-center p-6"
	>
		<span class="loading loading-spinner loading-lg text-primary"></span>
	</section>
{:else}
	<section class="card bg-base-200 not-prose mx-auto max-w-2xl p-6">
		<div class="mb-6 flex items-center gap-4">
			<img
				src={profile.photoURL || 'https://via.placeholder.com/40'}
				alt={profile.displayName || 'User'}
				class="border-base-300 h-10 w-10 rounded-full border"
			/>
			<div>
				<h2 class="text-xl font-bold">{profile.displayName || 'User'}</h2>
				<p class="text-sm opacity-50">Your public profile</p>
			</div>
		</div>
		<form on:submit|preventDefault={saveProfile} class="space-y-4">
			<!-- Bio -->
			<div>
				<label class="label" for="bio"><span class="label-text">Bio</span></label>
				<textarea
					id="bio"
					bind:value={profile.bio}
					rows="3"
					class="textarea textarea-bordered w-full"
				></textarea>
			</div>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label class="label" for="youtube"><span class="label-text">YouTube</span></label>
					<input
						id="youtube"
						type="url"
						placeholder="YouTube Link"
						bind:value={profile.links!.youtube}
						class="input input-bordered w-full"
					/>
				</div>

				<div>
					<label class="label" for="instagram"><span class="label-text">Instagram</span></label>
					<input
						id="instagram"
						type="url"
						placeholder="Instagram Link"
						bind:value={profile.links!.instagram}
						class="input input-bordered w-full"
					/>
				</div>

				<div>
					<label class="label" for="discord"><span class="label-text">Discord</span></label>
					<input
						id="discord"
						type="text"
						placeholder="Discord Link"
						bind:value={profile.links!.discord}
						class="input input-bordered w-full"
					/>
				</div>

				<div>
					<label class="label" for="tiktok"><span class="label-text">TikTok</span></label>
					<input
						id="tiktok"
						type="url"
						placeholder="TikTok Link"
						bind:value={profile.links!.tiktok}
						class="input input-bordered w-full"
					/>
				</div>
			</div>

			<div class="pt-6 text-right">
				<button class="btn btn-primary" type="submit" disabled={saving}>
					{saving ? 'Saving...' : 'Save Profile'}
				</button>
			</div>
		</form>
	</section>
{/if}
