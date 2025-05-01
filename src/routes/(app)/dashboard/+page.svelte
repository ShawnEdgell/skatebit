<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { user, authReady } from '$lib/stores/auth';
	import { getUserProfile, updateUserProfile } from '$lib/firebase/users';
	import type { UserProfile } from '$lib/types/users';
	import { showToast } from '$lib/utils/toast';

	type LinkKey = 'youtube' | 'instagram' | 'discord' | 'tiktok';
	const linkKeys: LinkKey[] = ['youtube', 'instagram', 'discord', 'tiktok'];

	let profile: Partial<UserProfile> = {
		links: {}
	};

	let linkErrors: Partial<Record<LinkKey, string>> = {};
	let loading = true;
	let saving = false;

	const pageTitle = 'Dashboard';
	const pageDescription = 'Update your profile information and social links.';

	const platformDomains: Record<LinkKey, string> = {
		youtube: 'youtube.com',
		instagram: 'instagram.com',
		discord: 'discord.gg',
		tiktok: 'tiktok.com'
	};

	function isValidSocialLink(key: LinkKey, url: string): boolean {
		try {
			const parsed = new URL(url);
			return parsed.hostname.includes(platformDomains[key]);
		} catch (e) {
			return false;
		}
	}

	$: if (authReady && $user === null && !loading) goto('/');

	onMount(() => {
		const unsubscribe = authReady.subscribe(async (ready) => {
			if (ready && $user) {
				const existingProfile = await getUserProfile($user.uid);

				profile = {
					bio: existingProfile?.bio ?? '',
					links: {
						youtube: existingProfile?.links?.youtube ?? '',
						instagram: existingProfile?.links?.instagram ?? '',
						discord: existingProfile?.links?.discord ?? '',
						tiktok: existingProfile?.links?.tiktok ?? ''
					}
				};

				loading = false;
			}
		});

		return unsubscribe;
	});

	async function saveProfile() {
		if (!$user) return;
		saving = true;
		linkErrors = {};

		for (const key of linkKeys) {
			const url = profile.links?.[key];
			if (url && !isValidSocialLink(key, url)) {
				linkErrors[key] = `Invalid ${key} link`;
			}
		}

		if (Object.keys(linkErrors).length > 0) {
			showToast('Please fix the invalid links.', 'error');
			saving = false;
			return;
		}

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
				src={$user?.photoURL || 'https://via.placeholder.com/40'}
				alt={$user?.displayName || 'User'}
				class="border-base-300 rounded-box h-10 w-10 border"
			/>
			<div>
				<h2 class="text-xl font-bold">{$user?.displayName || 'User'}</h2>
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

			<!-- Social Links -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each linkKeys as key}
					<div>
						<label class="label" for={key}>
							<span class="label-text">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
						</label>
						<input
							id={key}
							type="url"
							placeholder={key + ' Link'}
							bind:value={profile.links![key]}
							class="input input-bordered w-full {linkErrors[key] ? 'input-error' : ''}"
						/>
						{#if linkErrors[key]}
							<p class="text-error mt-1 text-sm">{linkErrors[key]}</p>
						{/if}
					</div>
				{/each}
			</div>

			<!-- Save Button -->
			<div class="pt-6 text-right">
				<button class="btn btn-primary" type="submit" disabled={saving}>
					{saving ? 'Saving...' : 'Save Profile'}
				</button>
			</div>
		</form>
	</section>
{/if}
